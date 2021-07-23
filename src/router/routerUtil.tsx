
import { IPushProp } from "./IRouter";
// export const loadComponent = (filename: String) =>
//   Loadable({
//     loader: () => import(`@/views/${filename}`),
//     loading: loading,
//   });

// const loading = (): JSX.Element => {
//   return <></>;
// };
function push(path: string): void;
function push(props: IPushProp): void;
function push(props: string | IPushProp): void {
  if (typeof props === "string")
    window.location.hash = "#" + props
  else
    window.location.hash = "#" + props.path
}

export { push }