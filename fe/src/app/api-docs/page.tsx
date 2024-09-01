import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocs() {
  return (
    <section>
      <SwaggerUI url="http://localhost:3001/" />
    </section>
  );
}
