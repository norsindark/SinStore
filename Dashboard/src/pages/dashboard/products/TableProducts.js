import React, { useState, useEffect } from "react";
import { Badge, Card, CardHeader, CardFooter, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Media, Pagination, PaginationItem, PaginationLink, Progress, Table, Container, Row, UncontrolledTooltip, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import Header from "components/dashboard/Headers/Header.js";
import { getAllProducts, updateProduct, createProduct, deleteProduct } from '../../../services/product';
import { getCategoryList } from "../../../services/category";

const TableProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedStatus, setEditedStatus] = useState('Active');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);

        const categoriesData = await getCategoryList();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditProduct = (product) => {
    setEditedProduct(product);
    setEditedName(product.name);
    setEditedCategory(product.category_id);
    setEditedStatus(product.status);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateProduct(editedProduct.id, {
        name: editedName,
        category_id: editedCategory,
        status: editedStatus
      });

      const updatedProducts = products.map(product => {
        if (product.id === editedProduct.id) {
          return {
            ...product,
            name: editedName,
            category_id: editedCategory,
            status: editedStatus,
            description: editedDescription,
            price: editedPrice,
          };
        }
        return product;
      });

      setProducts(updatedProducts);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setEditedName(value);
        break;
      case 'category_id':
        setEditedCategory(value);
        break;
      case 'status':
        setEditedStatus(value);
        break;
      case 'description':
        setEditedDescription(value);
        break;
      case 'price':
        setEditedPrice(value);
        break;
      case 'image_path':
        setEditedImage(value);
        break;
      default:
        break;
    }
  };

  const handleCreateProduct = async () => {
    try {
      await createProduct({
        name: newProductName,
        category_id: newProductCategory,
        description: newDescription,
        price: newPrice,
      });
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
      setIsCreateModalOpen(false);

      window.alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed) {
      try {
        await deleteProduct(productId);
        const updatedProducts = await getAllProducts();
        setProducts(updatedProducts);

        window.alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Products Table</h3>
              </CardHeader>
              <Button color="primary" onClick={toggleCreateModal}>Add New Product</Button>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Description</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map(product => (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>{product.name}</td>
                      <td>{categories.find(category => category.id === product.category_id)?.name}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={() => handleEditProduct(product)}>
                              Edit
                            </DropdownItem>
                            <DropdownItem onClick={() => handleDeleteProduct(product.id)}>
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem>
                      <PaginationLink
                        previous
                        href="#"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(
                      (number) => (
                        <PaginationItem key={number} className={number + 1 === currentPage ? "active" : ""}>
                          <PaginationLink href="#" onClick={() => paginate(number + 1)}>
                            {number + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationLink
                        next
                        href="#"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                      />
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>

        {/* Modal for Edit Product */}
        <Modal isOpen={isModalOpen} toggle={handleCancelEdit}>
          <ModalHeader toggle={handleCancelEdit}>Edit Product</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="editedName">Name</Label>
              <Input
                type="text"
                name="name"
                id="editedName"
                value={editedName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedCategory">Category</Label>
              <Input
                type="select"
                name="category_id"
                id="editedCategory"
                value={editedCategory}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={editedDescription}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="text"
                name="price"
                id="price"
                value={editedPrice}
                onChange={handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSaveEdit}>Save</Button>{' '}
            <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* Modal for Create Product */}
        <Modal isOpen={isCreateModalOpen} toggle={toggleCreateModal}>
          <ModalHeader toggle={toggleCreateModal}>Create Product</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="newProductName">Name</Label>
              <Input
                type="text"
                name="newProductName"
                id="newProductName"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="newProductDescription">Description</Label>
              <Input
                type="text"
                name="newProductDescription"
                id="newProductDescription"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="newProductPrice">Price</Label>
              <Input
                type="text"
                name="newProductPrice"
                id="newProductPrice"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="newProductCategory">Category</Label>
              <Input
                type="select"
                name="newProductCategory"
                id="newProductCategory"
                onChange={(e) => setNewProductCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            {/* Add other form fields for description, price, image_path if needed */}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleCreateProduct}>Create</Button>{' '}
            <Button color="secondary" onClick={toggleCreateModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default TableProducts;