import {
  BlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ParagraphBlockObjectResponse,
  PartialBlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
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
    default:
      return "";
  }
};

const getLinkHtml = (href: string, text: string): string => {
  return `<a href='${href}' target='_blank' class='underline text-slate-500'>${text}</a>`;
};

const convertParagraph = ({
  paragraph,
}: ParagraphBlockObjectResponse): string => {
  const initial =
    paragraph.rich_text.length > 1 ? "<div class='flex gap-x-2'>" : "<div>";

  return paragraph.rich_text.reduce(
    (acc, { plain_text, href, annotations: { color, bold } }, idx) => {
      let className = bold ? "font-bold" : "";
      className += color === "default" ? " text-black" : ` text-${color}-700`;
      const innerText = href
        ? `<p>${getLinkHtml(href, plain_text)}</p>`
        : `<p class='${className}'>${plain_text}</p>`;

      if (idx === paragraph.rich_text.length - 1) {
        return acc + innerText + "</div>";
      }

      return acc + innerText;
    },
    initial
  );
};

const convertHeading1 = ({
  heading_1,
}: Heading1BlockObjectResponse): string => {
  return heading_1.rich_text.reduce(
    (acc, { plain_text }) =>
      acc +
      `<h1 class='text-3xl font-bold text-green-700 pb-3'>${plain_text}</h1>`,
    ""
  );
};

const convertHeading2 = ({
  heading_2,
}: Heading2BlockObjectResponse): string => {
  return heading_2.rich_text.reduce((acc, { plain_text, href }) => {
    return href
      ? acc +
          `<h2 class='text-2xl font-semibold pb-3'>${getLinkHtml(
            href,
            plain_text
          )}</h2>`
      : acc + `<h2 class='text-2xl font-semibold pb-3'>${plain_text}</h2>`;
  }, "");
};

const convertHeading3 = ({
  heading_3,
}: Heading3BlockObjectResponse): string => {
  return heading_3.rich_text.reduce(
    (acc, { plain_text }) =>
      acc +
      `<h3 class='text-xl font-semibold text-green-700 pt-3 pb-1'>${plain_text}</h3>`,
    ""
  );
};

const convertBulletedListItem = (
  block: BulletedListItemBlockObjectResponse
): string => {
  // console.log(block, "/////bulleted_list_item");
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
  return "<div class='border-b my-10 h-1'></div>";
};

// column_list 처음 나오면, <div>로 열어주기 그리고 캐싱해놓기
// column => block_id 나오면, 캐싱된 아이디랑 같으면, <div>로 열어주기, 캐싱된 아이디랑 다르면, </div>로 닫아주기
// list or p tag 캐싱된 아이디랑 같으면, 태그 만들어주기
