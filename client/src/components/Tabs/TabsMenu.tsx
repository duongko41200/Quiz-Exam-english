import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ResultTestReading from "../../pages/ExamTest/ResultTest/ResultReading/ResultReading";
import ResultTestWriting from "../../pages/ExamTest/ResultTest/ResultWritiing/ResultWriting";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabsResult({resultReading,resultWriting}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Reading" {...a11yProps(0)} />
          <Tab label="Writing" {...a11yProps(1)} />
          <Tab label="Part 3" {...a11yProps(2)} />
          <Tab label="Part 4" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ResultTestReading resultReading={resultReading } />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ResultTestWriting resultWriting={resultWriting} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* <ReadingPartThree/> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {/* <ReadingPartFour/> */}
      </CustomTabPanel>
    </Box>
  );
}
