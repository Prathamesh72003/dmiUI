document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
  
  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  
    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }
  
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }
  
    thumbnailElement.dataset.label = file.name;
  
    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
  

  function getCaptions(){
    var image_input = document.getElementById("image_input");
    var static_heading = document.getElementById("static_heading");
    var child_right = document.getElementById("child_right");


    if (image_input.files.length != 0) {
        static_heading.innerHTML = "Processing...";   
        
        // creating dynamic h1 for heading
        var h1 = document.createElement("h1");
        h1.innerHTML = "These are some of the captions you can use!!!";
        h1.setAttribute("id", "dynamic_heading");

        var caption_list = document.createElement("div");
        caption_list.classList.add("caption_list");

        var captions = ["this is cap1","this is cap2","this is cap3","this is cap4","this is cap5"];

        for (let index = 0; index < captions.length; index++) {
            var caption = captions[index];
            var list_item = document.createElement("div");
            list_item.classList.add("list_item");

            list_item.innerHTML = caption;
            
            caption_list.appendChild(list_item);
        }

        child_right.appendChild(h1);
        child_right.appendChild(caption_list);

        static_heading.style = "display: none";    
    }else{
        alert("Please upload an image!");

    }
  } 
  