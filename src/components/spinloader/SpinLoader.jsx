import "./spinLoaderStyle.scss";
const SpinLoader = () => {
  console.log("spinning");
  return (
    <div className="loader">
      <div className="lds-spinner" style={{ alignSelf: "center" }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default SpinLoader;
