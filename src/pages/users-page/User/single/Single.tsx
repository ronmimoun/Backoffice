import classes from "./single.module.scss";
import { UserModel } from "../../../../types/user.type";
import ParsedObjectDetails from "../../../../components/shared/ParsedObjectDetails/ParsedObjectDetails";
import { Input } from "../../../../components/ui/Input/InputBase/Input";
import { FormProvider, useForm } from "react-hook-form";
import {
  USER_FORM_CONFIG,
  USER_SCHEMA,
  EditUserForm,
} from "../../../../form/schemas/userSchema";
import { ButtonPrimary } from "../../../../components/ui/Button/ButtonPrimary";
import { useCallback, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../../store";
import { userActions } from "../../../../store/user/user.actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../../../../models/base/api-base";
import { UpdateUserResponse } from "../../../../models/user/update-user/updateUser.response";
import { dateUtilService } from "../../../../utils/date.utils";
import { DateFormatsEnum } from "../../../../enums/DateFormats.enum";
import { NO_IMAGE_FALLBACK } from "../../../../constants/image.constants";

type SingleProps = {
  user: UserModel;
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
};

const Single = ({ user }: SingleProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formMethods = useForm<EditUserForm>({
    defaultValues: {
      [USER_FORM_CONFIG.INPUTS.USERNAME.KEY]:
        user.username || USER_FORM_CONFIG.INPUTS.USERNAME.DEFAULT_VALUE,
      [USER_FORM_CONFIG.INPUTS.EMAIL.KEY]:
        user.email || USER_FORM_CONFIG.INPUTS.EMAIL.DEFAULT_VALUE,
      [USER_FORM_CONFIG.INPUTS.PHONE.KEY]:
        user.phone || USER_FORM_CONFIG.INPUTS.PHONE.DEFAULT_VALUE,
      [USER_FORM_CONFIG.INPUTS.ADDRESS.KEY]:
        user.address || USER_FORM_CONFIG.INPUTS.ADDRESS.DEFAULT_VALUE,
    },
    resolver: zodResolver(USER_SCHEMA),
  });
  const dispatch = useAppDispatch();

  const parsedUserDetails = useMemo(() => {
    return {
      Id: user._id,
      Gender: user.gender,
      "Is Admin": user.isAdmin,
      Email: user.email,
      "Created at": dateUtilService.getFormattedDate(
        user.createdAt,
        DateFormatsEnum.DD_MM_YYYY
      ),
      "Updated at": dateUtilService.getFormattedDate(
        user.updatedAt,
        DateFormatsEnum.DD_MM_YYYY
      ),
      Phone: user.phone,
      Address: user.address,
      "Is Varified": `${user.verified}`,
      "Is Active": `${user.isActive || ""}`,
      Credits: user.credits,
    };
  }, [user]);

  const onSubmit = useCallback(async (data: EditUserForm) => {
    setIsLoading(true);
    const requestData = {
      ...data,
      _id: user._id,
    };
    const response = (await dispatch(
      userActions.updateUserThunk(requestData)
    )) as PayloadAction<ApiResponse<UpdateUserResponse>>;

    setIsLoading(false);
    if (!response.payload.isSucceeded || !response.payload.data?.content)
      return;
  }, []);

  return (
    <div className={classes.single}>
      <div className={classes.view}>
        <ParsedObjectDetails
          entityId={user._id}
          details={parsedUserDetails}
          imgUrl={user.imgUrl?.url || NO_IMAGE_FALLBACK}
          title={user.fullname}
        />
      </div>
      <hr />
      <FormProvider {...formMethods}>
        <form
          className={classes.edit}
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <Input
            className={classes.edit__input}
            name={USER_FORM_CONFIG.INPUTS.USERNAME.KEY}
            label={USER_FORM_CONFIG.INPUTS.USERNAME.LABEL}
          />
          <Input
            className={classes.edit__input}
            name={USER_FORM_CONFIG.INPUTS.EMAIL.KEY}
            label={USER_FORM_CONFIG.INPUTS.EMAIL.LABEL}
          />
          <Input
            className={classes.edit__input}
            name={USER_FORM_CONFIG.INPUTS.PHONE.KEY}
            label={USER_FORM_CONFIG.INPUTS.PHONE.LABEL}
          />
          <Input
            className={classes.edit__input}
            name={USER_FORM_CONFIG.INPUTS.ADDRESS.KEY}
            label={USER_FORM_CONFIG.INPUTS.ADDRESS.LABEL}
          />
          <ButtonPrimary isLoading={isLoading} type="submit">
            Submit
          </ButtonPrimary>
        </form>
      </FormProvider>
    </div>
  );
};

export default Single;

{
  /* {chart && <div className={classes.chart}></div>} */
}

{
  /* <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div> */
}

{
  /* <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer> */
}
