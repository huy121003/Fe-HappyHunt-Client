import { useQuery } from "@tanstack/react-query";
import CButtonActionIcon from "./CButtonActionIcon";
import { API_KEY } from "@/features/categories/data/constants";
import CategoryService from "@/features/categories/service";
import { ICategoryItem } from "@/features/categories/data/interface";
import { Spin, Empty, Drawer, Collapse } from "antd";
import { RightOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React, { useMemo, useState, useCallback } from "react";

interface ICateTree extends ICategoryItem {
  children: ICateTree[];
}

const { Panel } = Collapse;

function ButtonCate() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeKeys, setActiveKeys] = useState<(string | number)[]>([]); // keys mở Collapse

  // Lấy data category
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_CATEGORIES],
    queryFn: async () => {
      const res = await CategoryService.getAll();
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  // build cây category
  const buildMenuTree = useCallback(
    (categories: ICategoryItem[]): ICateTree[] => {
      const map = new Map<number, ICateTree>();
      categories.forEach((cat) =>
        map.set(Number(cat._id), { ...cat, children: [] })
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

  const menuTree = useMemo(() => {
    if (!data) return [];
    return buildMenuTree(data);
  }, [data, buildMenuTree]);

  // Xử lý toggle Collapse
  const onCollapseChange = (keys: (string | number)[]) => {
    setActiveKeys(keys);
  };

  // Click tên category cha => navigate
  const onParentNameClick = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation(); // ngăn mở/đóng collapse khi click tên
    navigate(`/category/${slug}`);
    setDrawerOpen(false);
  };

  // Click tên category con => navigate
  const onChildClick = (slugChild: string, slugParent: string) => {
    navigate(`/category/${slugParent}/child-category/${slugChild}`);
    setDrawerOpen(false);
  };

  // Click icon mũi tên => toggle collapse
  const onToggleCollapse = (key: string | number, e: React.MouseEvent) => {
    e.stopPropagation(); // ngăn click lan ra Panel header
    if (activeKeys.includes(key)) {
      setActiveKeys(activeKeys.filter((k) => k !== key));
    } else {
      setActiveKeys([...activeKeys, key]);
    }
  };

  // Render nội dung drawer collapse
  const renderCategoryPanels = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[100px]">
          <Spin size="large" />
        </div>
      );
    }
    if (menuTree.length === 0) {
      return (
        <div className="flex justify-center items-center h-[100px]">
          <Empty description="No categories available" />
        </div>
      );
    }

    return (
      <Collapse
        accordion={false}
        activeKey={activeKeys}
        onChange={onCollapseChange}
        bordered={false}
        style={{ overflowY: "auto" }}
      >
        {menuTree.map((item) => {
          const hasChildren = item.children.length > 0;
          return (
            <Panel
              key={item._id}
              showArrow={false} // ẩn mũi tên mặc định
              header={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ cursor: "pointer", flex: 1 }}
                    onClick={(e) => onParentNameClick(item.slug, e)}
                  >
                    {item.name}
                  </div>
                  {hasChildren && (
                    <div
                      style={{ cursor: "pointer", paddingLeft: 8 }}
                      onClick={(e) => onToggleCollapse(item._id, e)}
                    >
                      {activeKeys.includes(item._id) ? (
                        <DownOutlined />
                      ) : (
                        <RightOutlined />
                      )}
                    </div>
                  )}
                </div>
              }
            >
              {/* Nếu có con thì render danh sách con */}
              {hasChildren &&
                item.children.map((child) => (
                  <div
                    key={child._id}
                    style={{ padding: "6px 24px", cursor: "pointer" }}
                    onClick={() => onChildClick(child.slug, item.slug)}
                  >
                    {child.name}
                  </div>
                ))}
            </Panel>
          );
        })}
      </Collapse>
    );
  };

  return (
    <>
      <CButtonActionIcon
        icon="fas fa-bars"
        title="Search by Category"
        aria-label="Search by Category"
        onClick={() => setDrawerOpen(true)}
      />
      <Drawer
        title="Categories"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        bodyStyle={{ padding: 0 }}
      >
        {renderCategoryPanels()}
      </Drawer>
    </>
  );
}

export default ButtonCate;
