import { useCookies } from "react-cookie";

function AuthProvider() {
    const [cookies] = useCookies(['user'])
    if (cookies.jwt)
        return {"Authorization": `Bearer ${cookies.jwt}`}
    else
        return {};
}
export default AuthProvider;