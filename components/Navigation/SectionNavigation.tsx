import Link from "next/link";
import sections from "./sections/sections.json";
import {
  Bullseye,
  Card,
  Gallery,
  GalleryItem,
  Grid,
  GridItem,
  Label,
  List,
  ListItem,
  CardBody,
  CardTitle,
  TextVariants,
} from "@patternfly/react-core";
import { createUseStyles } from "react-jss";
import classnames from "clsx";
import CommandLineIcon from "./command-line";
import PenToolIcon from "./pen-tool";
import React from "react";

const useStyles = createUseStyles({
  gallery: {
    columnCount: "auto",
    columnWidth: "330px",
  },
  card: {
    overflow: "hidden",
    breakInside: "avoid-column",
  },
  label: {
    padding:
      "var(--pf-global--spacer--sm) 12px var(--pf-global--spacer--sm) 12px",
  },
});

export type SectionType = keyof typeof sections;
export type SectionItem = {
  title: string;
  href: string;
  groupTitle?: string;
  groups?: { title: string }[];
};
export type NavRecord = Partial<Record<SectionType, SectionItem[]>>;

const SectionNavigation = ({ navigations }: { navigations: SectionType[] }) => {
  const classes = useStyles();
  return (
    <Gallery
      className={classnames(classes.gallery, "pf-u-display-block")}
      hasGutter
    >
      {navigations.flatMap((parentKey) => (
        <GalleryItem key={parentKey}>
          <Card
            key={parentKey}
            className={classnames(
              classes.card,
              "pf-u-display-block pf-u-mb-md pf-u-background-color-100"
            )}
            isSelectable
          >
            <CardTitle className="pf-u-pb-md">
              {(sections[parentKey as SectionType] as { title: string }).title}
              <Label
                color="orange"
                className={classnames(classes.label, "pf-u-float-right")}
              >
                <CommandLineIcon width="16" height="16" />
              </Label>
              {/*<Label color="purple" className={classnames(classes.label, "pf-u-float-right")}><PenToolIcon/></Label>*/}
            </CardTitle>
            <CardBody>
              <List isPlain>
                {(
                  sections[parentKey as SectionType] as {
                    items: SectionItem[];
                  }
                ).items.map(({ title, href }, key) => (
                  <ListItem
                    key={`${parentKey}-${key}`}
                    className="pf-u-font-size-sm pf-u-pb-sm"
                  >
                    <Link href={href}>{title}</Link>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
        </GalleryItem>
      ))}
    </Gallery>
  );
};
export default SectionNavigation;
