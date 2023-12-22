export const inputStyle = {
  borderColor: "tea.green",
  borderX: "none",
  borderTop: "none",
  borderRadius: 0,
  _placeholder: { color: "tea.matcha", textTransform: "uppercase" },
  _hover: { borderColor: "tea.brown" },
  _focus: { outline: "none", borderColor: "tea.brown" },
};

export const buttonStyle = (modify = null) => {
  const styleObj = {
    border: "1px solid",
    borderColor: "tea.green",
    px: "0.9rem",
    py: "0.3rem",
    borderRadius: "5px",
    bgColor: "tea.green",
    color: "tea.light.100",
    cursor: "pointer",
  };
  if (modify === "outline") {
    styleObj.bgColor = "none";
    styleObj.color = "tea.green";
  }
  return { ...styleObj };
};
