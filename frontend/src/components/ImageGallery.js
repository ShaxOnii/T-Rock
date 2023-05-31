import {Button, Container, Modal, ModalBody, ModalHeader} from "reactstrap";
import styled from "styled-components";
import {DeleteIcon, PlusIcon} from "./Utils";
import {useContext} from "react";
import {userContext} from "../providers/UserContextProvider";

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  vertical-align: middle;
`

const ImageControlButton = styled(Button)`
  display: none;
  position: absolute;
  z-index: 1;
  top: 0.5em;
  right: 0.5em;
  transition: display 0.2s ease-in-out;
`

const ImageContainer = styled.div`
  padding: 16px;
  height: 300px;
  cursor: pointer;
  position: relative;
  flex: auto;

  &:hover::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: ${props => props.theme.secondary};
    opacity: 0.2;
  }

  &:hover ${ImageControlButton} {
    display: block;
  }

`

export const ImageGalleryItem = ({src}) => {

    return (
        <ImageContainer>
            <ImageControlButton color={"danger"}>
                <DeleteIcon/>
            </ImageControlButton>
            <Image src={src}/>
        </ImageContainer>
    );
}

const AddImageButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;

  font-size: 72px;
  width: 200px;
  margin: 16px;

  transition: background-color 0.2s ease-in-out;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.textLight};

  &:hover {
    background-color: ${props => props.theme.primaryDark};
    cursor: pointer;
  }
`

const AddImageButton = ({onSaveImage}) => {
    const {Api} = useContext(userContext);

    const saveImage = (filename, imageEncodedData) => {
        Api("Image", {
            method: "POST",
            body: {
                content: imageEncodedData,
                filename: filename
            }
        }).then(([result, isOk]) => {
            if (isOk) {
                if (onSaveImage) {
                    onSaveImage(result.id)
                }
            }
        })
    }

    const loadImage = (onLoad) => {
        const fileInput = document.createElement("input");
        fileInput.type = "file"
        fileInput.accept = "image/png,image/jpg"
        fileInput.addEventListener("change", () => {
            if (onLoad) {
                onLoad(fileInput.files[0]);
            }
        })

        fileInput.click();
    }

    const handleAddImage = () => {
        loadImage((image) => {
            const reader = new FileReader();
            reader.readAsDataURL(image)

            reader.onload = () => {
                const encodedfile = reader.result.split(',')[1];
                saveImage(image.name, encodedfile)
            };

            reader.onerror = (error) => {
                console.log('Error: ', error);
            };
        });
    }

    return (
        <AddImageButtonContainer onClick={handleAddImage}>
            <PlusIcon/>
        </AddImageButtonContainer>
    )
}

const GalleryContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
`

export const ImageGallery = ({toggle, isOpen, children, onImageAdded}) => {

    const handleSaveImage = (imageId) => {
        if (onImageAdded) onImageAdded(imageId);
    }

    return (
        <Modal isOpen={isOpen} size={"xl"}>
            <ModalHeader toggle={toggle}>
                <h3>Edit Product Images</h3>
            </ModalHeader>
            <ModalBody>
                <GalleryContainer>
                    {children}
                    <AddImageButton onSaveImage={handleSaveImage}/>
                </GalleryContainer>
            </ModalBody>
        </Modal>
    );
}






