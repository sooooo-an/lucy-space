import { ContactType } from "@/types/about";
import React from "react";
import Panel from "../ui/Panel";
import IconButton from "../ui/IconButton";
import GithubIcon from "../ui/icons/GithubIcon";
import MailIcon from "../ui/icons/MailIcon";
import KakaoIcon from "../ui/icons/KakaoIcon";

type Props = {
  contact: ContactType;
};
export default function Contact({ contact }: Props) {
  return (
    <Panel title="CONTACT.">
      <ul className="flex gap-3">
        {contact?.email && (
          <li>
            <IconButton
              iconColor="#ffffff"
              bgColor="#c71610"
              icon={<MailIcon />}
              type="link"
              link={`mailto:${contact.email}`}
            />
          </li>
        )}

        {contact?.github && (
          <li>
            <IconButton
              iconColor="text-white"
              bgColor="bg-black"
              icon={<GithubIcon />}
              type="link"
              link={contact.github}
              isBlank
            />
          </li>
        )}

        {contact?.kakao && (
          <li>
            <IconButton
              iconColor="rgba(0, 0, 0, 0.9)"
              bgColor="#FEE500"
              icon={<KakaoIcon />}
              type="link"
              link={contact.kakao}
            />
          </li>
        )}
      </ul>
    </Panel>
  );
}
