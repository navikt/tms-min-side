import useUXSignalScript from "./useUXSignalScript.tsx";

interface Props {
  panelId: string;
  mode?: "demo" | "";
}

const UXSignalContent = (props: Props) => {
  useUXSignalScript(true);

  return (
    <div data-uxsignals-embed={props.panelId} style={{ maxWidth: "620px" }} data-uxsignals-mode={props.mode ?? ""} />
  );
};

export default UXSignalContent;
