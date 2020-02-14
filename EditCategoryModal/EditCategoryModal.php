<!DOCTYPE html>

<html>

<head>
</head>

<body>
<div id="edit-category-modal-id" class="edit-category-modal">
        <!-- Modal content -->
        <div class="edit-category-modal-content">
            <div class="edit-category-header">
                <!-- <span class="close-new-product-modal">&times;</span> -->
                <h2 style="margin-bottom: 10px;">Edit Category</h2>
            </div>
            <hr style="margin-bottom: 15px;color: rgba(169, 169, 169, 0.5);width: 564px;" />

            <div class="edit-category-modal-middle">
                <label class="label-edit-category-modal">Category Name:</label>
                <input type="text" id="edit-category-name" class="input-edit-category-name-class" value="" />
                <hr class="hr-edit-category-modal" />

                <label class="label-edit-category-modal">Category ID:</label>
                <input type="text" id="edit-category-id" class="input-edit-category-name-class" value="" disabled/>
                <hr class="hr-edit-category-modal" />

                <label class="label-edit-category-modal">Category Image:</label>
                <input type="file" id="edit-category-img" class="add-new-img-category"/>

            </div>
            <hr style="margin-bottom: 15px;color: rgba(169, 169, 169, 0.5);width: 564px;" />
            <div style="text-align: center; width: 370px; position: absolute;display: none;
                        margin: 8px; background-color: #fff3cd; height: 36px;border-color: #ffeeba;" class="edit-category-err-background">
                <strong id="edit-category-error-message" style="vertical-align: -webkit-baseline-middle;color: red;"></strong>
            </div>
            <div style="float: right;padding: 7px;margin-right: 10px;">
                <button class="cancel-button-edit-category" onclick="onCancelEditCategoryModal()">Cancel</button>
                <button class="edit-button-edit-category" onclick="onEdit()">Edit</button>
            </div>
        </div>

        <div id="continue-without-saving-edit-category-modal-id" class="continue-without-saving-edit-category-modal-class">
            <!-- Modal content -->
            <div class="continue-without-saving-edit-category-modal-content">
                <h2 style="margin-bottom: 10px;">Continue without saving</h2>
                <hr style="margin-bottom: 15px;" />
                <div style="text-align: left; width: 485px;border-radius: 4px;
                        margin: 20px auto 20px auto; background-color: #fff3cd; height: 40px;border-color: #ffeeba;">
                    <strong id="edit-error-category-message" style="vertical-align: -webkit-baseline-middle;color: #856404;">
                        Are you sure you want to leave without continuing editing?
                    </strong>
                </div>
                <hr />

                <div style="float: right;padding: 7px;margin-right: 10px;">
                    <button class="no-button-continue-without-saving-category-edit" onclick="continueEditingCategoryModal()">No</button>
                    <button class="yes-button-continue-without-saving-category-edit" onclick="dontContinueEditingCategoryModal()">Yes</button>
                </div>

            </div>
        </div>
    </div>

    <div id="response-message-edit-category-modal-id" class="response-message-edit-category-modal-class">
        <!-- Modal content -->
        <div class="response-message-edit-category-modal-content">
            <span class="response-message-edit-category-modal-close">&times;</span>

            <span style="font-weight: bold;line-height: 3px;" id="edit-category-success-message">Data Edited Successfully</span>
        </div>
    </div>
</body>
</html>