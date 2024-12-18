import { ScaleLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <ScaleLoader
        color="#FF8500"
        height={35}
        margin={2}
        radius={2}
        width={4}
      />
    </div>
  );
}

export default Loader;
