import {Table} from "reactstrap";

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
    return (
        <thead>
        <tr>
            {fields.map(field => <th>{field.caption}</th>)}
        </tr>
        </thead>
    )
}


const SimpleTableItem = ({fields, item}) => {

    const formatData = (field) => {
        if(field.format){
            return field.format(item[field.name]);
        }else {
            return item[field.name]
        }
    }

    return (
        <tr>
            {fields.map(field =>
                <td>{formatData(field)}</td>
            )}
        </tr>
    )
}

export const field = (name, caption, fieldFormatter) => {
    return {name, caption, format: fieldFormatter};
}

export default SimpleTable;










