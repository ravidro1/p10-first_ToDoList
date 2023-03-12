import {useEffect, useState} from "react";
import "./App.css";
import Form from "./Form";
import ListSec from "./List";
import {Typography, Tabs, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import swal from "sweetalert";

import DangerousIcon from "@mui/icons-material/Dangerous";

const LOCAL_STORAGE_KEY = "data";

function App() {
  const [tabs, setTabs] = useState([]);

  const [currentTab, setCurrentTab] = useState("0");

  let bool = false;
  useEffect(() => {
    const importData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (importData && !bool) {
      bool = true;
      setTabs(importData);
      console.log(importData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tabs));
  }, [tabs]);

  function addTab(name) {
    const obj = {
      name,
      arr: [],
    };
    setTabs((prev) => [...prev, obj]);
  }

  function alertWindow(isTaskOrTab) {
    // if(isTaskOrTab === 0) alert("You Try To Add New Tab But The Tab Window Is Empty!!!");
    // if(isTaskOrTab === 1) alert("You Try To Add New Task But The Task Window Is Empty!!!");

    // if(isTaskOrTab === 2) alert("You Try To Delete Tab But There Are No Tabs!!!");

    if (isTaskOrTab === 0)
      swal(
        "Warning!",
        "You Try To Add New Tab But The Tab Window Is Empty!!!",
        "warning"
      );
    if (isTaskOrTab === 1)
      swal(
        "Warning!",
        "You Try To Add New Task But The Task Window Is Empty!!!",
        "warning"
      );
  }

  function addToDo(newToDo) {
    if (tabs.length > 0) {
      setTabs((prev) => {
        prev[currentTab].arr.push(newToDo);
        console.log(prev);
        return [...prev];
      });
    } else {
      addTab("Deafult");
      setTabs((prev) => {
        // prev[currentTab].arr.push(newToDo);
        if (prev[currentTab].arr.length < 1) prev[currentTab].arr.push(newToDo);
        console.log(prev);
        return [...prev];
      });
    }
  }

  function completed(index) {
    setTabs((prev) => {
      prev[currentTab].arr[index].completed =
        !prev[currentTab].arr[index].completed;
      return [...prev];
    });
  }

  function remove(index) {
    setTabs((prev) => {
      tabs[currentTab].arr = tabs[currentTab].arr.filter(
        (item, i) => i !== index
      );
      return [...tabs];
    });
  }

  function removeTab() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Tab!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your Tab has been deleted!", {
          icon: "success",
        });

        setTabs((prev) =>
          prev.filter((item, index) => index !== Number(currentTab))
        );
        if (Number(currentTab) > 0) {
          let temp = Number(currentTab);
          temp--;
          setCurrentTab(temp.toString());
        }
      } else {
        swal("Your Tab is safe!");
      }
    });
    // if(tabs.length < 1) alertWindow(2);
  }

  function removeAllTabs() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Tab!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your Tabs has been deleted!", {
          icon: "success",
        });
        setTabs([]);
        setCurrentTab("0");
      } else {
        swal("Your Tabs is safe!");
      }
    });
  }

  const getCurrentTopic = (event, newTabIndex) => setCurrentTab(newTabIndex);

  return (
    <div className="App">
      <div className="main">
        <Typography className="headline" variant="h1" style={{padding: 16}}>
          {" "}
          TODO LIST{" "}
        </Typography>

        <div className="div-input">
          {tabs.length > 0 && (
            <Button onClick={removeAllTabs}>
              {" "}
              <DangerousIcon />{" "}
            </Button>
          )}
          <Form setToDo={addToDo} addTab={addTab} alertWindow={alertWindow} />

          <Box
            sx={{
              width: "100%",
              typography: "body1",
              height: "auto",
            }}
          >
            <TabContext value={currentTab.toString()}>
              <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <TabList
                  onChange={getCurrentTopic}
                  // centered
                  variant="scrollable"
                  scrollButtons="auto"
                  // scroller
                >
                  {tabs.map((tab, i) => (
                    <Tab key={i} label={tab.name} value={i.toString()} />
                  ))}
                </TabList>
              </Box>
              {tabs.map((tab, i) => (
                <TabPanel key={i} value={i.toString()}>
                  <ListSec
                    allList={tab.arr}
                    completed={completed}
                    remove={remove}
                  />
                </TabPanel>
              ))}
            </TabContext>
            {tabs.length > 0 && (
              <Button type="submit" onClick={removeTab}>
                {" "}
                X{" "}
              </Button>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default App;
