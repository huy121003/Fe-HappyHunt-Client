import { useQuery } from "@tanstack/react-query";
import CButtonActionIcon from "./CButtonActionIcon";
import { API_KEY } from "@/features/categories/data/constants";
import CategoryService from "@/features/categories/service";
import { ICategoryItem } from "@/features/categories/data/interface";
import { Dropdown, Flex, Menu, MenuProps, Spin, Empty } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React, { useMemo, useState, useCallback } from "react";

interface ICateTree extends ICategoryItem {
  children: ICateTree[];
}

type MenuItem = Required<MenuProps>["items"][number];

function ButtonCate() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Fetch category data
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_CATEGORIES],
    queryFn: async () => {
      const res = await CategoryService.getAll();
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  // Memoize the tree building function to prevent unnecessary recalculations
  const buildMenuTree = useCallback(
    (categories: ICategoryItem[]): ICateTree[] => {
      const map = new Map<number, ICateTree>();

      // Initialize categories with empty children
      categories.forEach((cat) =>
        map.set(Number(cat._id), { ...cat, children: [] as ICateTree[] })
      );

      return categories.reduce<ICateTree[]>((tree, cat) => {
        const node = map.get(Number(cat._id))!;

        if (cat.parent) {
          const parent = map.get(Number(cat.parent._id));
          if (parent) {
            parent.children.push(node);
          }
        } else {
          tree.push(node);
        }
        return tree;
      }, []);
    },
    []
  );

  // Build the category tree
  const menuTree = useMemo(() => {
    if (!data) return [];
    return buildMenuTree(data);
  }, [data, buildMenuTree]);

  // Navigation handlers
  const handleMenuParentClick = useCallback(
    (slug: string) => {
      navigate(`/category/${slug}`);
      setOpen(false);
    },
    [navigate]
  );

  const handleMenuChildrenClick = useCallback(
    (slugChild: string, slugParent: string) => {
      navigate(`/category/${slugParent}/child-category/${slugChild}`);
      setOpen(false);
    },
    [navigate]
  );

  // Stop propagation for the menu click
  const handleMenuClick = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  // Build menu items
  const menuItems = useMemo(() => {
    if (isLoading) {
      return [
        {
          key: "loading",
          label: (
            <div className="flex justify-center items-center h-[100px]">
              <Spin size="large" />
            </div>
          ),
        },
      ];
    }

    if (menuTree.length === 0) {
      return [
        {
          key: "empty",
          label: (
            <div className="flex justify-center items-center h-[100px] ">
              <Empty description="No categories available" />
            </div>
          ),
        },
      ];
    }

    const menu: MenuItem[] = menuTree.map((item) => ({
      key: item._id.toString(),
      label: (
        <Flex
          key={item._id}
          align="center"
          gap={2}
          className="cursor-pointer w-full !p-0 !m-0 "
          justify="space-between"
          onClick={() => handleMenuParentClick(item.slug)}
          role="menuitem"
        >
          <span className="truncate">{item.name}</span>
          {item.children.length > 0 && <RightOutlined />}
        </Flex>
      ),
      ...(item.children.length > 0 && {
        children: item.children.map((child) => ({
          key: child._id.toString(),
          label: (
            <Flex
              onClick={() => handleMenuChildrenClick(child.slug, item.slug)}
              align="center"
              gap={2}
              className="cursor-pointer"
              role="menuitem"
            >
              {child.name}
            </Flex>
          ),
        })),
      }),
    }));

    return [
      {
        key: "menu",
        label: (
          <Menu
            items={menu}
            className="border-none !p-0 !m-0  overflow-auto"
            style={{ padding: 0 }}
          />
        ),
      },
    ];
  }, [isLoading, menuTree, handleMenuParentClick, handleMenuChildrenClick]);

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleMenuClick,
      }}
      trigger={["click"]}
      open={open}
      onOpenChange={(flag) => setOpen(flag)}
      dropdownRender={(menu) => (
        <div className="!bg-white rounded shadow-md  overflow-auto hover:bg-white">
          {React.cloneElement(menu as React.ReactElement)}
        </div>
      )}
      overlayClassName="custom-dropdown"
    >
      <CButtonActionIcon
        icon="fas fa-bars"
        title="Search by Category"
        aria-label="Search by Category"
      />
    </Dropdown>
  );
}

export default ButtonCate;
