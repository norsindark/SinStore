import React, { useState, useEffect } from "react";
import { Badge, Card, CardHeader, CardFooter, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Media, Pagination, PaginationItem, PaginationLink, Progress, Table, Container, Row, UncontrolledTooltip, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import Header from "components/dashboard/Headers/Header.js";
import { getProducts, updateProduct, addNewProduct, deleteProduct } from "services/admin/products/product.service"
import { getCategories } from "services/admin/categories/category.service";
import { getWarehouses } from "services/admin/warehouses/warehouse.service";
import { set } from "js-cookie";

const TableProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedStatus, setEditedStatus] = useState('Active');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedImageUrl, setEditedImage] = useState('');
  const [editedWarehouseName, setEditedWarehouseName] = useState('');
  const [editedImportQuantity, setEditedImportQuantity] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newWarehouseName, setNewWarehouseName] = useState('');
  const [newImportQuantity, setNewImportQuantity] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);

        console.log(productsData[0].productWarehouses);


        const categoriesData = await getCategories();
        setCategories(categoriesData);

        const warehousesData = await getWarehouses();
        setWarehouses(warehousesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditProduct = (product) => {
    setEditedProduct(product);
    setEditedName(product.name);
    setEditedCategory(product.categoryId);
    setEditedStatus(product.status);
    setEditedDescription(product.description);
    setEditedPrice(product.price);
    setEditedImage(product.image);
    setEditedImportQuantity(product.importQuantity);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const data = {
        id: editedProduct.id,
        name: editedName,
        categoryId: editedCategory,
        status: editedStatus,
        description: editedDescription,
        price: editedPrice,
        image: editedImageUrl,
        importQuantity: editedImportQuantity
      };

      const response = await updateProduct(data);
      if (!response) {
        window.alert("Error updating product!");
        return;
      }

      window.alert(response.message || "Product updated successfully!");

      const updatedProducts = products.map(product => {
        if (product.id === editedProduct.id) {
          return {
            ...product,
            name: editedName,
            categoryId: editedCategory,
            status: editedStatus,
            description: editedDescription,
            price: editedPrice,
            image: editedImageUrl,
            warehouseName: editedWarehouseName,
          };
        }
        return product;
      });

      toggleCreateModal();


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
      case 'editedName':
        setEditedName(value);
        break;
      case 'editedCategory':
        setEditedCategory(value);
        break;
      case 'editedDescription':
        setEditedDescription(value);
        break;
      case 'editedPrice':
        setEditedPrice(value);
        break;
      case 'editedImage':
        setEditedImage(value);
        break;
      case 'editedImportQuantity':
        setEditedImportQuantity(value);
        break;
      default:
        break;
    }
  };

  const handleCreateProduct = async () => {
    try {
      const data = {
        name: newProductName,
        price: parseFloat(newPrice),
        categoryId: newProductCategory,
        description: newDescription,
        image: newImageUrl,
        warehouseName: newWarehouseName,
        importQuantity: parseInt(newImportQuantity)
      };
      await addNewProduct(data);
      const updatedProducts = await getProducts();
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
        const response = await deleteProduct(productId);
        if (response) {
          window.alert("Product deleted successfully!");
          const updatedProducts = await getProducts();
          setProducts(updatedProducts);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const toggleCreateModal = () => {
    setNewProductName('');
    setNewProductCategory('');
    setNewDescription('');
    setNewPrice('');
    setNewImageUrl('');
    setNewWarehouseName('');
    setNewImportQuantity('');
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

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
                    <th scope="col">Import Quantity</th>
                    <th scope="col">Quantity Available</th>
                    <th scope="col">Quantity Sold</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>{product.name}</td>
                      <td>{categories.find(category => category.id === product.categoryId)?.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <div onClick={toggleDescription}>
                          {showFullDescription ? (

                            <>{product.description}</>
                          ) : (

                            <>{product.description.slice(0, 20)}{product.description.length > 100 && '...'}</>
                          )}
                        </div>
                      </td>
                      <td>
                        {product.productWarehouses.map(productWarehouse => (
                          <span key={productWarehouse.id}>{productWarehouse.importQuantity}</span>
                        ))}
                      </td>
                      <td>
                        {product.productWarehouses.map(productWarehouse => (
                          <span key={productWarehouse.id}>{productWarehouse.quantityAvailable}</span>
                        ))}
                      </td>
                      <td>
                        {product.productWarehouses.map(productWarehouse => (
                          <span key={productWarehouse.id}>{productWarehouse.quantitySold}</span>
                        ))}
                      </td>
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
                name="editedName"
                id="editedName"
                value={editedName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedCategory">Category</Label>
              <Input
                type="select"
                name="editedCategory"
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
              <Label for="editedDescription">Description</Label>
              <Input
                type="text"
                name="editedDescription"
                id="editedDescription"
                value={editedDescription}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedPrice">Price</Label>
              <Input
                type="text"
                name="editedPrice"
                id="editedPrice"
                value={editedPrice}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedImage">Image URL</Label>
              <Input
                type="text"
                name="editedImage"
                id="editedImage"
                value={editedImageUrl}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedImportQuantity">Import Quantity</Label>
              <Input
                type="text"
                name="editedImportQuantity"
                id="editedImportQuantity"
                value={editedImportQuantity}
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
          <ModalHeader toggle={toggleCreateModal}>Edit Product</ModalHeader>
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
            <FormGroup>
              <Label for="newProductImage">Image URL</Label>
              <Input
                type="text"
                name="newProductImage"
                id="newProductImage"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="newProductWarehouse">Warehouse Name</Label>
              <Input
                type="select"
                name="newProductWarehouse"
                id="newProductWarehouse"
                onChange={(e) => setNewWarehouseName(e.target.value)}
              >
                <option value="">Select a warehouse</option>
                {warehouses.map(warehouse => (
                  <option key={warehouse.id} value={warehouse.name}>
                    {warehouse.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="newProductImportQuantity">Import Quantity</Label>
              <Input
                type="number"
                name="newProductImportQuantity"
                id="newProductImportQuantity"
                value={newImportQuantity}
                onChange={(e) => setNewImportQuantity(e.target.value)}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleCreateProduct}>Save</Button>{' '}
            <Button color="secondary" onClick={toggleCreateModal}>Cancel</Button>
          </ModalFooter>
        </Modal>


      </Container>
    </>
  );
};

export default TableProducts;