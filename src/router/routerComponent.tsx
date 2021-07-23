import React, { ReactNode, Suspense, useEffect, useState } from 'react';
import routes from './indexRoutes'
import { getPathName, getRouter, componentNullable } from './lib'
import { useSelector } from 'react-redux'
import { push } from './routerUtil'

let _firstLoad = true;//是否第一次加载
const App = () => {
  const [pathname, setPathName] = useState<string>();
  let userToken = useSelector((state: any) => state.system.token)
  userToken = userToken ? userToken : localStorage.getItem("token");
  window.onhashchange = () => {
    console.log(window.location.href, getPathName(window.location.href), "hashchange");
    setPathName(getPathName(window.location.href));
  }
  
  
  // window.onpopstate = () => {
  //   console.log(window.location.href, getPathName(window.location.href), "popstate")
  //   setPathName(getPathName(window.location.href));
  // }


  useEffect(() => {
    _firstLoad = false;
    setPathName(getPathName(window.location.href));
  }, [])

  //第一次加载不做渲染
  if (_firstLoad && pathname !== undefined) return <></>

  const targetRoute = getRouter(routes, getPathName(pathname));

  console.log("pathname:" + getPathName(pathname))
  if (!targetRoute?.withoutAuth && !userToken) {
    push({ path: "/login" })
    return <></>
  }
  if (!targetRoute) {
    push({ path: "/page404" })
    return <></>
  }
  else if (targetRoute && !targetRoute.allowTop && pathname) {
    push({ path: "/page404" })
    return <></>;
  }
  else
    return <ComponentLoader component={componentNullable(getRouter(routes, pathname))} />
}


interface ISuspenseProps {
  component?: React.ReactNode;
  fallback?: NonNullable<ReactNode> | null
}

const ComponentLoader = (props: ISuspenseProps) => {
  return <Suspense fallback={props.fallback ? props.fallback : null} >
    {props.component}
  </Suspense>
}

export default App;
