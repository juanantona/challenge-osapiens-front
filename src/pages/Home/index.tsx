import { Box, Container, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Trans, useTranslation } from "react-i18next";
import { kebabCase } from "lodash";

const Home = () => {
  const { t } = useTranslation("app");
  const issues = [
    {
      icon: "🐞",
      title: t("home.issues.bug1.title"),
      description: t("home.issues.bug1.description"),
    },
    {
      icon: "🐞",
      title: t("home.issues.bug2.title"),
      description: t("home.issues.bug2.description"),
    },
    {
      icon: "🐞",
      title: t("home.issues.bug3.title"),
      description: t("home.issues.bug3.description"),
    },
    {
      icon: "🐞",
      title: t("home.issues.bug4.title"),
      description: t("home.issues.bug4.description"),
    },
    {
      icon: "⭐️",
      title: t("home.issues.bonusTrack.title"),
      description: t("home.issues.bonusTrack.description"),
    },
  ];

  return (
    <Box p={2} maxHeight="calc(100vh - 64px)" overflow={["auto", "auto"]}>
      <Container>
        <Typography variant="h1" textAlign="center">
          {t("home.welcome")}
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          <Trans i18nKey="home.intro"/>
        </Typography>
        <Typography variant="body2" textAlign="center" color="textSecondary">
          {t("home.sidenote")}
        </Typography>
        <List>
          {issues.map((issue, index) => (
            <ListItem key={`${index}-${kebabCase(issue.title)}`}>
              <Typography variant="h5" sx={{ p: 2 }}>
                {issue.icon}
              </Typography>
              <ListItemText
                primary={issue.title}
                secondary={issue.description}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default observer(Home);
