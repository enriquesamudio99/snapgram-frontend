import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../common/hooks';
import { authRoutes, privateRoutes } from '../router/routes';


const AppRouter = () => {

  const { status, checkAuthToken } = useAuth();

  useEffect(() => {
    checkAuthToken(); 
  }, []); 
  

  if (status === "checking") {
    return (
      <h3>Loading...</h3>
    )
  }

  return (
    <Routes>
      {
        (status === 'not-auth')
          ? (
            <>
              {authRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children?.map((child, index) => (
                    <Route key={index} path={child.path} element={child.element} />
                  ))}
                </Route>
              ))}
              <Route path="*" element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              {privateRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children?.map((child, index) => (
                    <Route key={index} path={child.path} element={child.element} />
                  ))}
                </Route>
              ))}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )
      }
    </Routes>
  )
}

export default AppRouter;