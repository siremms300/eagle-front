import { Modal } from 'antd';
import ReactPlayer from 'react-player';

const PreviewModal = ({ showModal, setShowModal, preview }) => {
  return (
    <>
      <Modal
        title="Course preview"
        open={showModal} 
        onCancel={() => setShowModal(!showModal)}
        footer={null}
        // width={960} 
        width={720}
        bodyStyle={{ padding: 0 }} 
        centered 
      >
        {/* <div className='wrapper' style={{ position: 'relative', paddingTop: '75%' }}> */} 
        <div className="wrapper">
          {/* Use padding-top to maintain a 16:9 aspect ratio */}
          <ReactPlayer
            url={preview}
            playing={showModal}
            controls={true}
            width="100%"
            height="400px"
            // style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </div>
      </Modal>
    </>
  );
};

export default PreviewModal;
