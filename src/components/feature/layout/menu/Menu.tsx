import classes from "./menu.module.scss";
import { NavLink } from "react-router-dom";
import { MENU } from "../../../../constants/menu.constants";

const Menu = () => {
  return (
    <div className={classes.menu_container}>
      <div className={classes.menu}>
        {MENU.map((item) => (
          <div className={classes.item} key={item.id}>
            <span className={classes.title}>{item.title}</span>
            {item.listItems.map((listItem) => (
              <NavLink
                to={listItem.url}
                className={() => {
                  return window.location.pathname === listItem.url
                    ? `${classes.listItem} ${classes.active}`
                    : classes.listItem;
                }}
                key={listItem.id}
              >
                {listItem.icon}
                <span className={classes.listItemTitle}>{listItem.title}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
