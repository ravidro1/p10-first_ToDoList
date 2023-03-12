import { List } from "@mui/material";

import Item from "./Item";

function ListSec({ allList, completed, remove }) {
  return (
    <div>
      <List style={{ padding: "0" }}>
        {allList.map((item, index) => (
          <Item
            remove={remove}
            completed={completed}
            key={index}
            oneItem={item}
            index={index}
          />
        ))}
      </List>
    </div>
  );
}

export default ListSec;
