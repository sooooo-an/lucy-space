import {
  BlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ParagraphBlockObjectResponse,
  PartialBlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  ColumnBlockObjectResponse,
  ColumnListBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const convertFromNotion = (
  results: (BlockObjectResponse | PartialBlockObjectResponse)[]
): string[] => {
  return results
    .filter((block): block is BlockObjectResponse => "type" in block)
    .map((block) => convert(block));
};

export const convert = (block: BlockObjectResponse): string => {
  switch (block.type) {
    case "paragraph":
      return convertParagraph(block);
    case "heading_1":
      return convertHeading1(block);
    case "heading_2":
      return convertHeading2(block);
    case "heading_3":
      return convertHeading3(block);
    case "bulleted_list_item":
      return convertBulletedListItem(block);
    case "numbered_list_item":
      return convertNumberedListItem(block);
    case "divider":
      return convertDivider();
    case "column_list":
      return convertColumnList(block);
    case "column":
      return convertColumn(block);
    default:
      console.log(block);
      return "";
  }
};

const convertParagraph = ({
  paragraph,
}: ParagraphBlockObjectResponse): string => {
  return paragraph.rich_text.reduce(
    (acc, { plain_text }) => acc + `<p class='font-bold'>${plain_text}</p>`,
    ""
  );
};

const convertHeading1 = ({
  heading_1,
}: Heading1BlockObjectResponse): string => {
  return heading_1.rich_text.reduce(
    (acc, { plain_text }) =>
      acc + `<h1 class='text-3xl font-bold'>${plain_text}</h1>`,
    ""
  );
};

const convertHeading2 = ({
  heading_2,
}: Heading2BlockObjectResponse): string => {
  return heading_2.rich_text.reduce(
    (acc, { plain_text }) => acc + `<h2>${plain_text}</h2>`,
    ""
  );
};

const convertHeading3 = ({
  heading_3,
}: Heading3BlockObjectResponse): string => {
  // console.log(heading_3, "2@");
  return heading_3.rich_text.reduce(
    (acc, { plain_text }) =>
      acc + `<h3 class='text-xl font-semibold'>${plain_text}</h3>`,
    ""
  );
};

const convertBulletedListItem = (
  block: BulletedListItemBlockObjectResponse
): string => {
  return block.bulleted_list_item.rich_text.reduce(
    (acc, { plain_text }) => acc + `<li>${plain_text}</li>`,
    ""
  );
};

const convertNumberedListItem = (
  block: NumberedListItemBlockObjectResponse
): string => {
  return block.numbered_list_item.rich_text.reduce(
    (acc, { plain_text }) => acc + `<li>${plain_text}</li>`,
    ""
  );
};

const convertDivider = (): string => {
  return "<hr>";
};

const convertColumnList = (block: ColumnListBlockObjectResponse): string => {
  return "";
};

const convertColumn = (block: ColumnBlockObjectResponse): string => {
  return "";
};
