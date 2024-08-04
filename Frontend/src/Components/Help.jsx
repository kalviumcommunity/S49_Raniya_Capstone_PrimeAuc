import React from "react";
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from "@coreui/react";
import "../Styles/Help.css";

function Help() {
  return (
    <div className="faq">
      <h2>Frequently Asked Questions</h2>
      <CAccordion flush>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            What is the minimum bid increment?
          </CAccordionHeader>
          <CAccordionBody>The minimum bid increment is ₹100.</CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>Can I retract my bid?</CAccordionHeader>
          <CAccordionBody>
            No, you cannot retract your bid once it has been placed.
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={3}>
          <CAccordionHeader>
            What happens if there is a tie bid?
          </CAccordionHeader>
          <CAccordionBody>
            In the event of a tie bid, the bidder with the earliest timestamp
            will win the auction.
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </div>
  );
}

export default Help;
