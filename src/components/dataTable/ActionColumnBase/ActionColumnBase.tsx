export type ActionColumn<T> = {
  actionFunction?: (entity: T) => void;
  text?: string;
  icon?: React.ReactNode;
  className?: string;
};

type ActionColumnBaseProps<T> = {
  actions: ActionColumn<T>[];
  entity: T;
};

const ActionColumnBase = <T,>({
  actions,
  entity,
}: ActionColumnBaseProps<T>) => {
  return (
    <div className="action">
      {actions?.map((action, idx) => {
        return (
          <div
            key={idx}
            onClick={() =>
              action.actionFunction && action.actionFunction(entity)
            }
          >
            {action.icon && action.icon}
            <p className={`mb-0 ${action.className || ""}`}>
              {action.text && action.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ActionColumnBase;
