import "./user.scss";
import Single from "./single/Single";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../store/user/user.selectors";
import { useCallback, useEffect, useState } from "react";
import { userApiService } from "../../../services/api/user.api.service";
import { UserModel } from "../../../types/user.type";

const User = () => {
  const { _id } = useParams();
  const getUserFromStateById = useSelector(
    userSelectors.getUserFromStateById(_id)
  );
  const [user, setUser] = useState(getUserFromStateById);

  useEffect(() => {
    if (!getUserFromStateById) getUserById();
  }, []);

  const getUserById = useCallback(async () => {
    if (!_id) return;
    const response = await userApiService.getById({ userId: _id });
    if (!response.isSucceeded || !response.data?.content) return;
    setUser(response.data.content);
  }, []);

  const handleSubmit = useCallback((updatedUser: UserModel) => {
    setUser(updatedUser);
  }, []);

  if (!user) return <></>;
  return (
    <div className="user">
      <Single user={user} onSubmit={handleSubmit} />
    </div>
  );
};

export default User;
