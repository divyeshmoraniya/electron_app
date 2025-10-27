import themes from "./theme";

export const getThemePreview = (themeKey, darkState) => {
  const theme = themes[themeKey][darkState ? "dark" : "light"];
  return (
    <>
      <div className="flex gap-1">
        <div className={`w-3 h-3 rounded-full ${theme.primary}`}></div>
        <div className={`w-3 h-3 rounded-full ${theme.messageOwn}`}></div>
        <div className={`w-3 h-3 rounded-full ${theme.secondary}`}></div>
      </div>
    </>
  );
};