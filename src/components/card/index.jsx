import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blueGrey } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SpaceMonkeyIcon from "../../assets/icons/spaceMonkeyLogoWhite.svg";

const keywords = [
  "monkey",
  "astronaut",
  "space",
  "baby monkey",
  "chimp",
  "stars",
  "sunset",
  "space ship",
  "milky way",
  "nature",
  "chimp",
  "cute monkey",
];

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: blueGrey[500],
    padding: "2px",
  },
}));

export default function RecipeReviewCard({ keyword, ...props }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [randomWord, setRandomWord] = React.useState("");

  const getWord = () => {
    const randomIndex = Math.floor(Math.random() * keywords.length);
    return keywords[randomIndex];
  };

  React.useEffect(() => {
    const word = getWord();
    setRandomWord(word);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const RandomImage = React.memo((props) => {
    return (
      <CardMedia
        className={classes.media}
        image={`https://source.unsplash.com/random?${randomWord}`}
        title={`Unsplash Image of ${randomWord}`}
      />
    );
  });

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={SpaceMonkeyIcon}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.user}
        subheader={props.date}
      />
      <RandomImage />
      <CardContent>
        <Typography variant="h5" color="textSecondary">
          {props.question}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Users Answers Coming Soon...</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
