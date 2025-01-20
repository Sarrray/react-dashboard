import { Document, Image, Page, View } from "@react-pdf/renderer";

const ReportPDF = ({ str }: { str: string }) => (
  <Document>
    <Page orientation="landscape">
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          //  style={{ width: 835, height: 590 }}
          src={str}
        />
      </View>
    </Page>
  </Document>
);

export default ReportPDF;
