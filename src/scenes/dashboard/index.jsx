import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "./index.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const columns = [
	{
		name: "Title",
		selector: (row) => row.title,
	},
	{
		name: "Brand",
		selector: (row) => row.brand.name,
	},
	{
		name: "Category",
		selector: (row) => row.category.title,
	},
	{
		name: "Size",
		selector: (row) => row.size,
	},
	{
		name: "Quantity",
		selector: (row) => row.quantity,
	},
	{
		name: "Price",
		selector: (row) => row.selling_price.toLocaleString(),
	},
	{
		name: "Date",
		selector: (row) => row.created_at,
	},
];

const Dashboard = () => {
	const [records, setRecords] = useState([]);
	const [originalData, setOriginalData] = useState([]);

	const fetchProducts = useCallback(async () => {
		axios.get("http://localhost:8080/products/").then((res) => {
			setRecords(res.data);
			setOriginalData(res.data);
		});
	}, []);

	const filterHandler = (e) => {
		const newData = originalData.filter((item) => {
			return (
				item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
				item.category.title
					.toLowerCase()
					.includes(e.target.value.toLowerCase()) ||
				(item.brand?.name?.toLowerCase() || "").includes(
					e.target.value.toLowerCase()
				)
			);
		});

		setRecords(newData);
	};
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	return (
		<div className="row px-2">
			<div className="ms-auto col-sm-6">
				<InputGroup className="mb-3">
					<Form.Control
						placeholder="Search For Items"
						aria-label="Item Search"
						aria-describedby="basic-addon2"
						onChange={filterHandler}
					/>
					<Button variant="outline-primary">Search</Button>
				</InputGroup>
			</div>
			<div className="col-sm-12">
				<DataTable
					columns={columns}
					data={records}
					fixedHeader
					pagination
					className="rdt_TableHead"
				/>
			</div>
		</div>
	);
};

export default Dashboard;
