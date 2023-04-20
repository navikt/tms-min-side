import useStore from "./store";

const withStore = (Component: any) => (props: any) => {
  const store = useStore();
  return <Component {...props} store={store} />;
};

export default withStore;
