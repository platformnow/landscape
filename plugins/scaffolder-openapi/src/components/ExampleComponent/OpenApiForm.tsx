import React, { useState } from 'react';
import Form from "@rjsf/core";
import validator from '@rjsf/validator-ajv8';

interface Props {
    openApiSchema: any;
}

const OpenApiForm: React.FC<Props> = ({ openApiSchema }) => {
    const [jsonSchema, setJsonSchema] = useState<any>(null);

    const toJsonSchema = require("@openapi-contrib/openapi-schema-to-json-schema");

    React.useEffect(() => {
        const convertedSchema = toJsonSchema(openApiSchema);
        setJsonSchema(convertedSchema);
    }, [openApiSchema, toJsonSchema]);

    if (!jsonSchema) {
        return <div>Loading...</div>;
    }


    return <Form schema={jsonSchema} validator={validator} />;
};

export default OpenApiForm;
