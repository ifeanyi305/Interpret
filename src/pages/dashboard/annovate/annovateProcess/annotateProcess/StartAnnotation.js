import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import EmptyLabel from "./labels/EmptyLabel";
import AddLabel from "./labels/AddLabel";
import LabelPrev from "./labels/LabelPrev";
import Annotation from 'react-image-annotation';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { flash } from "../../../../../redux/flash/flash";
import { ToastContainer } from 'react-toastify';
import { updateProgress } from '../../../../../redux/annotateProgress/progress';
import 'react-toastify/dist/ReactToastify.css';
import { addLabel } from '../../../../../redux/label/label';
import { useParams } from 'react-router-dom';
import { fetchProject } from '../../../../../redux/project/userProject';
import { getToken } from '../../../../../components/auth/Signin';
import Line from "../../../../../assets/annovate/Line.png";
import HorizontalLine from "../../../../../assets/annovate/LineHor.png";
import Elipse from "../../../../../assets/annovate/Ellipse.png";
import annotIcon from "../../../../../assets/annovate/annot.png";
import historyIcon from "../../../../../assets/annovate/history.png";
import rawDataIcon from "../../../../../assets/annovate/rawData.png";
import commentIcon from "../../../../../assets/annovate/comment.png";
import attributeIcon from "../../../../../assets/annovate/attribute.png";
import autoIcon from "../../../../../assets/annovate/auto.png";
import boundingBox from "../../../../../assets/annovate/boundingBox.png";
import dragIcon from "../../../../../assets/annovate/hand.png";
import redoIcon from "../../../../../assets/annovate/redo.png";
import undoIcon from "../../../../../assets/annovate/undo.png";
import roundStarIcon from "../../../../../assets/annovate/roundStar.png";
import greenCheck from "../../../../../assets/annovate/greenCheck.png";
import secGreenCheck from "../../../../../assets/annovate/greenCheck2.png";
import { ConsoleHttpPipelineLogger } from '@azure/ms-rest-js/es/lib/httpPipelineLogger';

const StartAnnotation = ({ imageFiles, imagesPreview,
  setAnnotPage, setShowLabel, manualImages, setNumber,
  annotatedImages, setAnnotatedImages, annotations,
  showLabel, setSelectedItem, setAnnotations }) => {
  const [labelStep, setLabelStep] = useState(0);
  const [label, setLabel] = useState([]);
  const [labelInput, setLabelInput] = useState("");
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [selectedAnnotTool, setSelectedAnnotTool] = useState(0);
  const [selectedTools, setSelectedTools] = useState(0);
  const [annotation, setAnnotation] = useState({});
  const [selectedImage, setSelectedImage] = useState(manualImages[0]);
  const [selectedImageFile, setSelectedImageFile] = useState(imageFiles[0]);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [isDraggable, setIsDraggable] = useState(true);
  const [imgSize, setImgSize] = useState(35);
  const undoStackRef = useRef([]);
  const redoStackRef = useRef([]);
  const { projects } = useSelector((state) => state.userProject);
  const project = projects?.filter((project) => (project._id === projectId));

  const userDetails = getToken();
  const userId = userDetails?.id;

  useEffect(() => {
    if (projects?.length === 0) {
      dispatch(fetchProject(userId));
    }
  }, [projects, userId, dispatch]);


  const imgContainerRef = useRef(null);
  const [showBackwardButton, setShowBackwardButton] = useState(false);

  const Box = ({ children, geometry, style }) => (
    <div
      style={{
        ...style,
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y}%`,
        height: `${geometry.height}%`,
        width: `${geometry.width}%`,
      }}
    >
      {children}
    </div>
  )

  function renderSelector({ annotation, active }) {
    const { geometry } = annotation;
    if (!geometry) return null

    return (
      <Box
        geometry={geometry}
        style={{
          border: `solid 2px #E10000`
        }}
      />
    )
  }

  function renderHighlight({ annotation, active }) {
    const { geometry } = annotation;
    const idIntegerPart = Math.floor(geometry?.height);

    if (!geometry) return null

    return (
      <Box
        key={annotation.data.id}
        geometry={geometry}
        style={{
          border: `solid 3px ${idIntegerPart % 2 !== 0 ? '#E10000' : '#0024E1'}`,
        }}
      />
    )
  }

  function renderContent({ annotation }) {
    const { geometry } = annotation;
    const idIntegerPart = Math.floor(geometry?.height);
    return (
      <div
        key={annotation.data.id}
        style={{
          background: `${idIntegerPart % 2 !== 0 ? '#C60606' : '#0653C6'}`,
          color: 'white',
          paddingRight: 10,
          paddingLeft: 10,
          fontWeight: "bolder",
          fontSize: 15,
          position: 'absolute',
          left: `${geometry.x}%`,
          top: `${geometry.y - 9}%`
        }}
      >
        {annotation.data && annotation.data.text}
      </div>
    )
  }

  const [selectedText, setSelectedText] = useState('');

  function renderEditor(props) {
    const { geometry } = props.annotation;
    if (!geometry) return null

    return (
      <div
        style={{
          position: 'absolute',
          left: `${geometry.x - geometry.width - 10}%`,
          top: `${geometry.y - geometry.height}%`,
        }}
        className="border-[1px] border-[#f10191] w-[294px] rounded-[8px] bg-[#24254C]"
      >
        <p className="bg-[#F10191] text-center annotation_editor font-[700] text-[18px] text-[#fff] py-2">
          Annotation Editor
        </p>
        <div className="p-4">
          <input
            className="border-[#F10191B2] w-full bg-[#110E55] rounded-[8px] border-[1px] py-[6px] pl-6 pr-2 text-[#D9D9D9] font-[400] text-[15px] text-[#fff]"
            value={selectedText}
            onChange={(e) => {
              setSelectedText(e.target.value);
              props.onChange({
                ...props.annotation,
                data: {
                  ...props.annotation.data,
                  text: e.target.value,
                },
              });
            }}
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-[#F10191D9] rounded-[12px] px-6 py-[2px] font-[600] text-[12px] text-[#fff]"
              onClick={() => {
                setSelectedText('');
                props.onSubmit();
              }}
            >
              Enter
            </button>
          </div>
        </div>
        <img src={HorizontalLine} alt="line" className="w-full h-[1px]" />
        <div className="py-4 px-2 max-h-[100px] scrollbar overflow-y-auto">
          {
            label.slice(0, 3).map((data, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedText(data);
                  props.onChange({
                    ...props.annotation,
                    data: {
                      ...props.annotation.data,
                      text: data,
                    },
                  });
                }}
                className="flex cursor-pointer items-center rounded-[8px] gap-2 hover:bg-[#F101914D] py-[4px]"
              >
                <img src={Elipse} alt="elipse" />
                <p className="text-[15px] font-[400] label_text text-[#fff]">{data}</p>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  const onChange = (newAnnotation) => {
    setAnnotation(newAnnotation);
  };

  const onSubmit = (newAnnotation) => {
    const { geometry, data } = newAnnotation;

    redoStackRef.current = [];

    setAnnotation({});
    const newAnnotationData = {
      geometry,
      data: {
        ...data,
        id: Math.random(),
        imageId: selectedImage,
      },
      projectId: projectId,
    };

    setAnnotations([...annotations, newAnnotationData]);

    setAnnotatedImages((prevAnnotatedImages) => [
      ...prevAnnotatedImages,
      selectedImage,
    ]);

    undoStackRef.current.push(annotations);
  };

  const moveSliderForward = () => {
    if (imgContainerRef.current) {
      const maxScrollLeft = imgContainerRef.current.scrollWidth - imgContainerRef.current.clientWidth;
      const newScrollLeft = imgContainerRef.current.scrollLeft + 130;

      if (newScrollLeft >= maxScrollLeft) {
        imgContainerRef.current.scrollLeft = 0;
      } else {
        imgContainerRef.current.scrollLeft = newScrollLeft;
      }
    }
  }

  const moveSliderBackward = () => {
    if (imgContainerRef.current) {
      imgContainerRef.current.scrollLeft -= 130
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentRef = imgContainerRef.current;

      if (currentRef) {
        setShowBackwardButton(currentRef.scrollLeft >= 130);
      }
    };

    const currentRef = imgContainerRef.current;

    imgContainerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      currentRef?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [showAllImagesAnnotated, setShowAllImagesAnnotated] = useState(true);

  const handleButtonClick = () => {
    setShowAllImagesAnnotated(!showAllImagesAnnotated);
  };

  const handleImgSizeDecrement = () => {
    setImgSize((prevSize) => Math.max(prevSize - 1, 0));
  };

  const handleImgSizeIncrement = () => {
    setImgSize((prevSize) => Math.min(prevSize + 1, 100));
  };

  const defaultImageSize = () => {
    setImgSize(35);
  };

  const handleUndo = useCallback(() => {
    if (undoStackRef.current.length > 0) {
      const lastAnnotations = undoStackRef.current.pop();
      redoStackRef.current.push([...annotations]);
      setAnnotations(lastAnnotations);
    }
  }, [annotations]);

  const handleRedo = useCallback(() => {
    if (redoStackRef.current.length > 0) {
      const nextAnnotations = redoStackRef.current.pop();
      undoStackRef.current.push([...annotations]);
      setAnnotations(nextAnnotations);
    }
  }, [annotations]);

  const applyAnnotationsToNewImage = (previousAnnotations, lastAnnotatedImage, projectId) => {
    return previousAnnotations
      .filter(anno => anno.data.imageId === lastAnnotatedImage)
      .map(anno => ({
        geometry: anno.geometry,
        data: {
          ...anno.data,
          id: Math.random(),
          imageId: selectedImage,
        },
        projectId: projectId,
      }));
  };
  
  const applyAnnotationsToSelectedImage = () => {
    const lastAnnotatedImage = annotatedImages[annotatedImages.length - 1];
    const annotationsForNewImage = applyAnnotationsToNewImage(annotations, lastAnnotatedImage, projectId);
    setAnnotations([...annotations, ...annotationsForNewImage]);
    setAnnotatedImages(prevAnnotatedImages => [...prevAnnotatedImages, selectedImage]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'z') {
        handleUndo();
      } else if (event.ctrlKey && event.key === 'y') {
        handleRedo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUndo, handleRedo]);

  const toggleDrawing = () => {
    setIsDrawingEnabled(!isDrawingEnabled);
  };

  const toggleDraggable = () => {
    setIsDraggable(!isDraggable);
  };

  const handleImageClick = useCallback((index) => {
    setSelectedImage(manualImages[index]);
  }, [setSelectedImage, manualImages]);

  const handleLeftButtonClick = useCallback(() => {
    const newIndex = (manualImages?.length + manualImages?.indexOf(selectedImage) - 1) % manualImages.length;
    handleImageClick(newIndex);
  }, [selectedImage, handleImageClick, manualImages]);

  const handleRightButtonClick = useCallback(() => {
    const newIndex = (manualImages?.indexOf(selectedImage) + 1) % manualImages?.length;
    handleImageClick(newIndex);
  }, [selectedImage, handleImageClick, manualImages]);

  const handleArrowKeyPress = useCallback((event) => {
    if (event.key === 'ArrowRight') {
      handleRightButtonClick();
    } else if (event.key === 'ArrowLeft') {
      handleLeftButtonClick();
    }
  }, [handleRightButtonClick, handleLeftButtonClick]);

  useEffect(() => {
    document.addEventListener('keydown', handleArrowKeyPress);
    return () => {
      document.removeEventListener('keydown', handleArrowKeyPress);
    };
  }, [handleArrowKeyPress]);

  const handleItemClick = (index) => {
    setSelectedAnnotTool(index);
  };

  const handleToolsClick = (index) => {
    setSelectedTools(index);
  }

  const saveLabel = (e) => {
    e.preventDefault();
    setLoading(true);

    const labels = [...label];

    dispatch(addLabel({ projectId, labels: labels })).then((res) => {
      if (res?.error) {
        console.log("label response", res);
        flash('error', res?.error.message);
        setLoading(false);
        setShowLabel(false);
      } else {
        flash('success', 'Label created successfully');
        setLoading(false);
        setShowLabel(false);
      }
    })
  }

  const validateBtn = () => {
    return label?.length !== 0
  }

  const currentStep = () => {
    switch (labelStep) {
      case 0:
        return <EmptyLabel setLabelStep={setLabelStep} />
      case 1:
        return <AddLabel
          setLabelStep={setLabelStep}
          label={label} setLabel={setLabel}
          labelInput={labelInput} setLabelInput={setLabelInput}
        />
      case 2:
        return <LabelPrev setShowLabel={setShowLabel} label={label} />
      default:
        return <EmptyLabel />
    }
  }

  const style = {
    icons: 'text-[#f10191d9]',
    span_active: "bg-[#D9D9D9] rounded-[21px] font-[400] text-[12px] text-[#1F2937] px-4",
    icons_active: "bg-[#F10191D9] rounded-[15px]",
    tools_active: "bg-[#F10191D9] py-[4px]"
  }

  const annotOptions = [
    {
      icon: annotIcon,
      name: "Annots"
    },
    {
      icon: attributeIcon,
      name: "Attributes"
    },
    {
      icon: commentIcon,
      name: "Comments"
    },
    {
      icon: historyIcon,
      name: "History"
    },
    {
      icon: rawDataIcon,
      name: "Raw data"
    },
  ]

  const annotTools = [
    {
      icon: dragIcon,
      name: "Drag Tool",
      desc: "Pan the image or select"
    },
    {
      icon: boundingBox,
      name: "Bounding box tool",
      desc: "Draw annotations"
    },
    {
      icon: commentIcon,
      name: "Comments",
      desc: "Add a comment"
    },
    {
      icon: undoIcon,
      name: "Undo",
      desc: "undo previous action"
    },
    {
      icon: redoIcon,
      name: "Redo",
      desc: "Redo previous action"
    },
    {
      icon: autoIcon,
      name: "Repeat Previous",
      desc: "Apply all annotations from previous image"
    },
  ]
  const [hoveredTool, setHoveredTool] = useState(null);

  const handleToolsHover = (index) => {
    setHoveredTool(index);
  };

  const handleScreenChange = () => {
    setNumber(3);
    setSelectedItem(3);
    const data = {
      projectId,
      newKey: "annotate",
    }
    dispatch(updateProgress(data));
  }

  const labelCounts = {};
  const renderedLabels = [];

  // Count occurrences of each label
  label?.forEach((data) => {
    if (labelCounts[data]) {
      labelCounts[data]++;
    } else {
      labelCounts[data] = 1;
    }
  });

  return (
    <div className="bg-[#374151] w-screen h-screen fixed top-0 left-0 annotator_container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <nav className="bg-[#211F5399] blurAnnot p-4 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2 w-[15%]">
          <button type='button' onClick={() => setAnnotPage(0)}>
            <AiOutlineArrowLeft className={style.icons} />
          </button>
          <p className="text-[12px] font-[600] text-[#fff]">{selectedImageFile?.name || 'No image uploaded'}</p>
        </div>
        <div className="bg-[#1F2937] flex items-center gap-4 rounded-[8px] px-4 py-[4px]">
          <button type='button' onClick={handleLeftButtonClick}>
            <AiOutlineArrowLeft className={style.icons} />
          </button>
          <p className="text-[15px] font-[500] text-[#fff]">{manualImages?.indexOf(selectedImage) + 1}/{manualImages?.length}</p>
          <button type="button" onClick={handleRightButtonClick}>
            <AiOutlineArrowRight className={style.icons} />
          </button>
        </div>
        <p className="hide">hidden</p>
      </nav>
      <section className="blurAnnot flex">
        <section className="w-[70%]">
          <div className="flex items-start gap-2 justify-center">
            <div className="ml-[6%] mt-[10%]">
              <div>
                <ul className="px-2 py-4 rounded-[12px] bg-[#111827]">
                  {
                    annotTools.map((tool, index) => (
                      <div className="flex gap-[4px] items-center" key={index}>
                        <li
                          className={`py-2 px-[7px] rounded-[6px] hover:bg-[#F101916E] ${selectedTools === index ? style.tools_active : ""}`}
                          onMouseEnter={() => handleToolsHover(index)}
                          onMouseLeave={() => handleToolsHover(null)}
                          onClick={() => {
                            if (tool.name === "Undo") {
                              handleUndo();
                              handleToolsClick(index);
                              setIsDrawingEnabled(false);
                              setIsDraggable(false)
                            } else if (tool.name === "Redo") {
                              handleRedo();
                              handleToolsClick(index);
                              setIsDrawingEnabled(false);
                              setIsDraggable(false);
                            } else if (tool.name === "Bounding box tool") {
                              toggleDrawing();
                              handleToolsClick(index);
                              setIsDraggable(false)
                            } else if (tool.name === "Drag Tool") {
                              toggleDraggable();
                              setIsDrawingEnabled(false)
                              handleToolsClick(index);
                            } else if (tool.name === "Repeat Previous") {
                              applyAnnotationsToSelectedImage()
                            } else {
                              handleToolsClick(index);
                            }
                          }}
                        >
                          <button type="button">
                            <img className="m-auto" src={tool.icon} alt={tool.name} />
                          </button>
                        </li>
                        {hoveredTool === index && (
                          <div className="bg-[#111827] absolute w-[12%] ml-[4%] rounded-[8px] p-2">
                            <p className="font-[600] text-[15px] text-[#fff]">{tool.name}</p>
                            <p className="text-[12px] font-[400] text-[#CDCDCD]">{tool.desc}</p>
                          </div>
                        )}
                      </div>
                    ))
                  }
                </ul>
              </div>
              <button type="button" className="my-4 ml-[10%]">
                <img className="bg-[#111827] rounded-[50%] p-2" src={roundStarIcon} alt="star" />
              </button>
            </div>
            <Draggable disabled={!isDraggable}>
              <div className={`m-auto mt-[10%] px-4
              ${isDrawingEnabled ? 'cursor-crosshair' : isDraggable ? 'cursor-grab' : ''}`
              } style={{ width: `${imgSize}%`}}>
                <Annotation
                  src={selectedImage}
                  alt="Annotate image"
                  annotations={annotations.filter((anno) => anno.data.imageId === selectedImage)}
                  type={annotation.type}
                  value={annotation}
                  className="h-auto"
                  onChange={onChange}
                  onSubmit={onSubmit}
                  disableAnnotation={!isDrawingEnabled}
                  allowTouch
                  renderSelector={renderSelector}
                  renderEditor={renderEditor}
                  renderHighlight={renderHighlight}
                  renderContent={renderContent}
                  renderOverlay={() => null}
                />
              </div>
            </Draggable>
          </div>
          <div className="w-[12%] bg-[#111827] rounded-[29px] pr-4 pl-4 py-[5px] absolute right-[33%] bottom-[15%]">
            <div className="flex justify-between flex-wrap items-center gap-2">
              <div className="flex gap-2 items-center">
                <button
                  onClick={handleImgSizeDecrement}
                  type="button"
                  className="text-[#F10191D9] text-[20px] font-[500]">-</button>
                <p className="font-[500] text-[15px] text-[#fff]">{imgSize}%</p>
                <button
                  onClick={handleImgSizeIncrement}
                  type="button"
                  className="text-[#F10191D9] text-[20px] font-[500]">+</button>
              </div>
              <div>
                <button
                  onClick={defaultImageSize}
                  type="button"
                  className="text-center text-[#F10191] font-[500] text-[15px]">Reset</button>
              </div>
            </div>
          </div>
          <div ref={imgContainerRef} className="bottom-0 fixed flex absolute overflow-x-auto xscrollbar w-[70%] border-[1px] bg-[#1F2937] border-[#F10191B2]">
            {showBackwardButton && (
              <div className="fixed bg-[#1B1A49] z-50 opacity-70 h-full">
                <button
                  type="button"
                  className="mt-8 px-[4px] text-[#F10191] font-extrabold text-[22px]"
                  onClick={moveSliderBackward}>
                  &laquo;
                </button>
              </div>
            )}
            <div className="flex gap-6 items-center pt-[12px] pl-4">
              {manualImages?.map((file, index) => (
                <div key={index}>
                  <div className="w-[109px] pt-[4px] pb-4 h-[75px] cursor-pointer">
                    <img
                      src={file}
                      alt={`Selected Preview ${index}`}
                      className={`w-full h-full 
                        ${selectedImage === file ? 'border-[#F10191] imagesPreview border-[1px]' : ""}`
                      }
                      onClick={() => handleImageClick(index)}
                    />
                    {annotatedImages.includes(file) && (
                      <div className="relative mt-[-53px] bg-[#00000059]" onClick={() => handleImageClick(index)}>
                        <img
                          src={greenCheck}
                          alt="green check"
                          className="m-auto py-[11.5px] cursor-pointer"
                        />
                      </div>
                    )}
                    <p className="text-[#252525A6] text-center text-[#fff] pt-[5px] text-[6px] font-[400]">{file.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="fixed left-[68.5%] bg-[#1B1A49] z-50 opacity-70 h-full">
              <button
                className="mt-8 px-[4px] text-[#F10191] font-extrabold text-[22px]"
                type="button"
                onClick={moveSliderForward}>
                &raquo;
              </button>
            </div>
          </div>
        </section>
        <div className="fixed h-full flex justify-end w-[30%] absolute right-0">
          <div className="flex gap-4 items-start w-full border-[1px] border-[#F10191B2] bg-[#24254C]">
            <div className="w-full">
              <div className="p-8">
                <p className="text-[15px] pb-2 font-[700] text-[#F10191]">Annotations</p>
                <p className="font-[700] text-[15px] text-[#fff]">Groups:
                  <span className="font-[400] ml-[4px] text-[15px] text-[#fff]">{project[0]?.objectName || ""}</span>
                </p>
              </div>
              <div className="flex items-center mb-2 justify-evenly">
                <button type="button" className="text-[15px] font-[700] text-[#F10191]">Classes</button>
                <button type="button" className="text-[15px] font-[700] text-[#fff]">Layers</button>
              </div>
              <img src={HorizontalLine} alt="line" className="w-full" />
              <div className="h-[300px] scrollbar p-6 overflow-y-auto">
                {label?.map((data, index) => {
                  // Only render the <p> element if it hasn't been rendered before
                  if (!renderedLabels.includes(data)) {
                    renderedLabels.push(data);

                    return (
                      <div key={index} className="flex justify-between mb-2 items-center gap-2">
                        <div className="flex items-center gap-2">
                          <img src={Elipse} alt="elipse" />
                          <p className="text-[15px] font-[400] label_text text-[#fff]">{data}</p>
                        </div>
                        <span className={style.span_active}>{labelCounts[data]}</span>
                      </div>
                    );
                  }

                  return null; // Return null for already rendered labels
                })}
              </div>
            </div>
            <ul className="py-8 px-4 bg-[#0C1B324D] border-[1px] border-[#F10191B2] h-full">
              {
                annotOptions.map((annotOpt, index) => (
                  <div
                    onClick={() => handleItemClick(index)}
                    key={index}
                    className={`${selectedAnnotTool === index ? style.icons_active : ''} mb-6 cursor-pointer py-2 px-[4px]`}>
                    <img
                      className="bg-[#374151] rounded-[50%] m-auto p-[2px]"
                      src={annotOpt.icon} alt={annotOpt.name}
                    />
                    <li className="text-[10px] font-[700] mt-[4px] text-center text-[#FFFFFF]">
                      {annotOpt.name}
                    </li>
                  </div>
                ))
              }
            </ul>
          </div>
        </div>
      </section>
      <div className="blurAnnot">
        {showAllImagesAnnotated && manualImages && manualImages.every(image => annotatedImages.includes(image)) && (
          <div className="flex justify-center annot_done_con">
            <div className="fixed bg-[#1D2244] mt-[-20%] border-[1px] w-fit border-[#F10191] rounded-[8px] px-[5%] py-4">
              <img
                src={secGreenCheck}
                alt="green check"
                className="m-auto bg-[#1D2244] mt-[-45px] p-2 rounded-[50%]"
              />
              <p className="text-[#F10191D9] font-[600] mt-2 text-[23px] text-center">All Done!</p>
              <p className="text-[#CACACA] text-[18px] mt-4 mb-10 font-[400]">You have labeled all images successfully</p>
              <div className="flex justify-center mt-8 mb-4 gap-4 items-center">
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="border-[#CACACA] font-[500] text-[17px] text-[#CACACA] border-[1px] rounded-[23px] px-8 py-[5px]">Back</button>
                <button
                  type="button"
                  onClick={() => handleScreenChange()}
                  className="bg-[#F10191D9] font-[500] text-[17px] text-[#CACACA] rounded-[23px] px-6 py-[5px]"
                >Proceed</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {
        showLabel ? (
          <div
            className="bg-[#1D2244] absolute fixed top-[20%] left-[27%] w-[45%] label_container border-[1px] border-[#F10191] rounded-[8px]"
          >
            <div className="flex items-start">
              <button
                type="button"
                className="text-[#C2D1D9] z-50 px-[3.5%] cursor-pointer text-[30px] font-[400]"
                onClick={() => setLabelStep(1)}
              >+</button>
              <img className="h-full" src={Line} alt="line" />
              <div className="">
                <div className="my-4 ml-[-8%]">
                  <p className="text-[23px] font-[600] text-center text-[#f10191d9]">Create Labels</p>
                </div>
                <div>
                  <p className="text-[17px] pl-4 mb-8 text-[#fff] font-[400]">
                    Before you start, you can create a list
                    of labels that you plan to assign to
                    objects in your project.
                  </p>
                </div>
                <img className="w-full" src={HorizontalLine} alt="line" />
                <div className="py-2 px-[5px]">
                  {currentStep()}
                </div>
              </div>
            </div>
            <div className="mt[8%]">
              <img className="w-full" src={HorizontalLine} alt="line" />
              <div className="flex justify-center py-[2%] gap-4">
                <button
                  type="button"
                  className="border-[2px] border-[#f10191d9] text-[#f10191d9] px-4 py-[4px] rounded-[23px] font-[600] text-[14px]"
                >
                  Load from file
                </button>
                <button
                  type="button"
                  disabled={!validateBtn()}
                  onClick={saveLabel}
                  className={` ${validateBtn() ? 'bg-[#F10191D9]' : 'bg-[#5F5F5F]'} text-[#fff] px-4 py-[4px] rounded-[23px] font-[500] text-[14px]`}
                >{isLoading ? 'loading...' : 'Proceed'}</button>
              </div>
            </div>
          </div>
        ) : (<></>)
      }
    </div>
  );
};
export default StartAnnotation;
