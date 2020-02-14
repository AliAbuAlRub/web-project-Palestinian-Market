<!DOCTYPE html>

<html>


<head></head>

<body>


    <div id="edit-product-modal-id" class="edit-product-modal">
        <!-- Modal content -->
        <div class="edit-product-modal-content">
            <div class="edit-product-header">
                <!-- <span class="close-new-product-modal">&times;</span> -->
                <h2 style="margin-bottom: 10px;">Edit Product</h2>
            </div>
            <hr style="margin-bottom: 15px;color: rgba(169, 169, 169, 0.5);width: 506px;" />

            <div class="edit-product-modal-middle">
                <label class="label-edit-product-modal">Product Name:</label>
                <input type="text" id="edit-product-name" class="input-edit-product-name-class" value="" />
                <hr class="hr-edit-product-modal" />

                <label class="label-edit-product-modal">Category:</label>
                <input type="text" id="edit-category" class="input-edit-product-name-class" value="" />
                <hr class="hr-edit-product-modal" />

                <label class="label-edit-product-modal">Size:</label>
                <input type="text" id="edit-size" class="input-edit-product-name-class" value="" />
                <hr class="hr-edit-product-modal" />

                <label class="label-edit-product-modal">Price:</label>
                <input type="text" id="edit-price" class="input-edit-product-name-class" value="" />
                <hr class="hr-edit-product-modal" />

                <label class="label-edit-product-modal">Remarks:</label>
                <textarea id="edit-remarks" class="textarea-edit-product-name-class"></textarea>
                <hr class="hr-edit-product-modal" />

                <label class="label-edit-product-modal">Description:</label>
                <textarea id="edit-description" class="textarea-edit-product-name-class"></textarea>
                <hr class="hr-add-edit-product-modal" />

                <label class="label-edit-product-modal">Old Images:</label>
                <div class="edit-img-container">
                    <!-- <input type="file" class="file-input-new-product-name-class" value="" />
                    <button class="remove-img-button" onclick="removeImg(this)">Remove</button>
                    <input type="file" class="file-input-new-product-name-class" value="" />
                    <button class="remove-img-button" onclick="removeImg(this)">Remove</button> -->

                </div>
                <button onclick="addNewImage()" class="edit-add-new-img-button">Add New Image</button>

                <hr class="hr-edit-product-modal" />

            </div>
            <hr style="margin-bottom: 15px;color: rgba(169, 169, 169, 0.5);width: 506px;" />
            <div style="text-align: center; width: 370px; position: absolute;display: none;
                        margin: 8px; background-color: #fff3cd; height: 36px;border-color: #ffeeba;" class="edit-err-background">
                <strong id="edit-product-error-message" style="line-height: 37px;color: red;"></strong>
            </div>
            <div style="float: right;padding: 7px;margin-right: 10px;">
                <button class="cancel-button-edit-product" onclick="onCancelEditmodal()">Cancel</button>
                <button class="edit-button-edit-product" onclick="onEdit()">Edit</button>
            </div>
        </div>

        <div id="continue-without-saving-edit-modal-id" class="continue-without-saving-edit-modal-class">
            <!-- Modal content -->
            <div class="continue-without-saving-edit-modal-content">
                <h2 style="margin-bottom: 10px;">Continue without saving</h2>
                <hr style="margin-bottom: 15px;" />
                <div style="text-align: left; width: 485px;border-radius: 4px;
                        margin: 20px auto 20px auto; background-color: #fff3cd; height: 40px;border-color: #ffeeba;">
                    <strong id="edit-error-message" style="vertical-align: -webkit-baseline-middle;color: #856404;">
                        Are you sure you want to leave without continuing editing?
                    </strong>
                </div>
                <hr />

                <div style="float: right;padding: 7px;margin-right: 10px;">
                    <button class="no-button-continue-without-saving-edit" onclick="continueEditing()">No</button>
                    <button class="yes-button-continue-without-saving-edit" onclick="dontContinueEditing()">Yes</button>
                </div>

            </div>
        </div>
    </div>

    <div id="response-message-edit-modal-id" class="response-message-edit-modal-class">
        <!-- Modal content -->
        <div class="response-message-edit-modal-content">
            <span class="response-message-edit-modal-close">&times;</span>

            <span style="font-weight: bold;line-height: 3px;" id="edit-success-message">Data Updated Successfully</span>
        </div>
    </div>

</body>

</html>