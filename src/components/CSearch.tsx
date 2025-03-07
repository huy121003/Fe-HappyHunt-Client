import Search, { SearchProps } from "antd/es/input/Search";

const CSearch = ({ maxLength = 255, onInput, ...rest }: SearchProps) => {
  const handleInput: SearchProps["onInput"] = (e) => {
    const target = e.target as HTMLInputElement;

    if (target.value?.length > maxLength) {
      target.blur();
      setTimeout(() => {
        target.focus();
      }, 0);
    }

    if (onInput) onInput(e);
  };

  return (
    <Search
      // maxLength={maxLength}
      size="large"
      onInput={handleInput}
      {...rest}
    />
  );
};

export default CSearch;
