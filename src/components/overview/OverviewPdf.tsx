import { Document, Image, Page, View } from "@react-pdf/renderer";

const OverviewPdf = ({ str }: { str: string }) => (
  <Document>
    <Page orientation="landscape">
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image style={{ width: 800, height: 550 }} src={str} />
      </View>
    </Page>
  </Document>
);

export default OverviewPdf;
