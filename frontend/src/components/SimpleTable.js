import {Table} from "reactstrap";
import styled from "styled-components";

/**
 *
 *  @fields Array of objects which describes fields will be shown in table.
 *      example: {name: "objectFieldName", caption: "Object Field Name which will be shown"}
 *  @items all table entries
 *
 */
const SimpleTable = ({fields = [], items = []}) => {
    return (
        <Table striped borderless>
            <SimpleTableHeader fields={fields}/>
            <tbody>
            {items.map((item, key) =>
                <SimpleTableItem item={item} key={key} fields={fields}/>
            )}
            </tbody>
        </Table>
    )
}


const SimpleTableHeader = ({fields}) => {
    const styles = (fieldType) => {
        if (fieldType === "actions") {
            return {
                display: "flex",
                justifyContent: "right",
            }
        }

        return undefined;
    }

    return (
        <thead>
        <tr>
            {fields.map(field => <th style={styles(field.type)}>{field.caption}</th>)}
        </tr>
        </thead>
    )
}


const TableRowWithAction = styled.td`
  display: flex;
  justify-content: right;
  align-items: center;
`

const SimpleTableItem = ({fields, item}) => {

    const formatData = (field) => {
        if (field.format) {
            return field.format(item[field.name]);
        } else {
            return item[field.name]
        }
    }

    return (
        <tr>
            {fields.map(field => {
                    if (field.type === "actions") {
                        return <TableRowWithAction>{formatData(field)}</TableRowWithAction>
                    }
                    return <td>{formatData(field)}</td>
                }
            )}
        </tr>
    )
}

export const field = (name, caption, {fieldFormatter, type} = {}) => {
    return {
        name, caption,
        format: fieldFormatter,
        type
    };
}

export default SimpleTable;










