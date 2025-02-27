import { useNavigate } from "react-router-dom";

const useRedirectWithRefresh = () => {
  const navigate = useNavigate();

  const redirect = (path) => {
    navigate(path);
    window.location.reload();
  };

  return redirect;
};

export default useRedirectWithRefresh;