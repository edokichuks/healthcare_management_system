import { useAuth } from "../hooks/useAuth";

export default function Profile() {
    const {role} = useAuth();
    return<div>{role}</div>
}