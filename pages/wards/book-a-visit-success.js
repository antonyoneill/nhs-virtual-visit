import React from "react";
import { GridRow, GridColumn } from "../../src/components/Grid";
import ActionLink from "../../src/components/ActionLink";
import AnchorLink from "../../src/components/AnchorLink";
import Text from "../../src/components/Text";
import Heading from "../../src/components/Heading";
import Layout from "../../src/components/Layout";
import verifyToken from "../../src/usecases/verifyToken";
import propsWithContainer from "../../src/middleware/propsWithContainer";

const Success = ({ showNavigationBar }) => {
  return (
    <Layout
      title="Virtual visit booked"
      showNavigationBarForType="wardStaff"
      renderLogout={true}
      showNavigationBar={showNavigationBar}
    >
      <GridRow>
        <GridColumn width="two-thirds">
          <Heading>Virtual visit booked</Heading>

          <Text>
            Your virtual visit has been booked and the key contact has been sent
            a text message with their scheduled time.
          </Text>

          <ActionLink href={`/wards/book-a-visit`}>
            Book another virtual visit
          </ActionLink>

          <Text>
            <AnchorLink href="/wards/visits">View virtual visits</AnchorLink>
          </Text>
        </GridColumn>
      </GridRow>
    </Layout>
  );
};

export const getServerSideProps = propsWithContainer(
  verifyToken(() => {
    const showNavigationBar = process.env.SHOW_NAVIGATION_BAR === "yes";
    return { props: { showNavigationBar } };
  })
);

export default Success;
