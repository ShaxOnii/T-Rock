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
        <Table borderless>
            <SimpleTableHeader fields={fields}/>
            <tbody>
            {items.map((item, key) =>
                <SimpleTableItem item={item} key={key} fields={fields}/>
            )}
            </tbody>
        </Table>
    )
}

const Tr = styled.tr`
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.textLight};
  
  &:nth-child(2n){
    background-color: ${props => props.theme.secondaryDark};

    color: ${props => props.theme.textLight};
  }
`

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
        <Tr>
            {fields.map(field => <th style={styles(field.type)}>{field.caption}</th>)}
        </Tr>
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
        <Tr>
            {fields.map(field => {
                    if (field.type === "actions") {
                        return <TableRowWithAction>{formatData(field)}</TableRowWithAction>
                    }
                    return <td>{formatData(field)}</td>
                }
            )}
        </Tr>
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










