import React, { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router'
import { Context } from "../context"
import axios from "axios";
import { Badge, Card, Modal } from "antd";
import Link from "next/link";

const Ebook = ({ locale }) => {
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");

  const showDescriptionModal = (description) => {
    setCurrentDescription(description);
    setDescriptionModalVisible(true);
  };

  const hideDescriptionModal = () => {
    setDescriptionModalVisible(false);
  };

  const [products, setProducts] = useState([]);
  const { state: { user } } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/ebook");
    const productsWithImages = data.filter(product => product.images.length > 0);
    setProducts(productsWithImages);
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  const buttonStyle = {
    borderColor: '#007BFF',
    cursor: 'pointer',
  };

  return (
    <div className='container-fluid'>
      <div className='row col-md-6 offset-md-3 text-center'>
        <h1 className='pt-5 fw-bold'>
          Ebooks just for you
        </h1>
        <p className='lead -b-4'>Choose the plan that suits you best</p>
      </div>

      <div className="row justify-content-center">
        {products.map(product => (
          <div className="col-md-4" key={product.id}>
            <Card className='mb-4'
              cover={
                <img
                  src={product.images[0]} 
                  alt={product.description}
                  style={{ height: '200px', objectFit: 'cover' }}
                  className='p-3'
                />
              }
            >
              <h2 className='font-weight-bold'>{product.name}</h2>
              <Badge count={"Click to see description"}
                style={{ backgroundColor: '#03a9f4', cursor: 'pointer' }}
                className='pb-2 mr-2'
                onClick={() => showDescriptionModal(product.description)}
              />
              <h4 className='pt-2'>
                {new Intl.NumberFormat(locale, {
                  style: 'currency',
                  currency: product.currency || "USD",
                }).format(product.unitAmount / 100)}
              </h4>

              <Link href={""} style={linkStyle}>
                <button className='w-100 btn' style={buttonStyle}>
                  Buy now
                </button>
              </Link>
            </Card>
          </div>
        ))}
      </div>

      <Modal
        title="Description"
        open={descriptionModalVisible}
        onOk={hideDescriptionModal}
        onCancel={hideDescriptionModal}
        footer={[
          <button key="back" onClick={hideDescriptionModal}>
            Close
          </button>,
        ]}
      >
        {currentDescription}
      </Modal>

      {/* <pre>{JSON.stringify(products, null, 4)}</pre> */}
    </div>
  )
}

export default Ebook;
