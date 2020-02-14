<!DOCTYPE html>

<html>


<head>
</head>

<body>
<div id="add-new-category-modal" class="add-new-category-modal">
        <!-- Modal content -->
        <div class="new-category-modal-content">
            <div class="add-new-category-header">
                <!-- <span class="close-new-product-modal">&times;</span> -->
                <h2 style="margin-bottom: 10px;">Add New Category</h2>
            </div>
            <hr style="margin-bottom: 15px;color: rgba(169, 169, 169, 0.5);width: 546px;" />

            <div class="new-category-modal-middle">
                <label class="label-new-category-modal">Category Name:</label>
                <input type="text" id="category-name" class="input-new-category-name-class" value="" />
                <hr class="hr-add-new-category-modal" />

                <label class="label-new-category-modal">Category ID:</label>
                <input type="text" id="category-id" class="input-new-category-name-class" value="" />

                <hr class="hr-add-new-category-modal" />

                <label class="label-new-category-modal">Image:</label>
                <input type="file" class="file-input-new-category-img-class"/>


                <hr class="hr-add-new-category-modal" />

            </div>
            <hr style="margin-bottom: 15px;color: rgba(169, 169, 169, 0.5);width: 546px;" />
            <div style="text-align: center; width: 370px; position: absolute;display: none;
                        margin: 8px; background-color: #fff3cd; height: 36px;border-color: #ffeeba;" class="category-err-background">
                <strong id="categoty-modal-error-message" style="vertical-align: -webkit-baseline-middle;color: red;"></strong>
            </div>
            <div style="float: right;padding: 7px;margin-right: 10px;">
                <button class="cancel-button-add-new-category">Cancel</button>
                <button class="add-button-add-new-category" >Add</button>
            </div>
        </div>

        <div id="continue-without-saving-category-modal-id" class="continue-without-saving-category-modal-class">
            <!-- Modal content -->
            <div class="continue-without-saving-category-modal-content">
                <h2 style="margin-bottom: 10px;">Continue without saving</h2>
                <hr style="margin-bottom: 15px;" />
                <div style="text-align: center; width: 538px;border-radius: 4px;
                        margin: 20px auto 20px auto; background-color: #fff3cd; height: 36px;border-color: #ffeeba;">
                    <strong id="category-error-message" style="vertical-align: -webkit-baseline-middle;color: #856404;">
                        Are you sure you want to leave without continuing adding a new category?
                    </strong>
                </div>
                <hr />

                <div style="float: right;padding: 7px;margin-right: 10px;">
                    <button class="no-button-continue-without-saving-category" onclick="noCancelAddNewCategory()">No</button>
                    <button class="yes-button-continue-without-saving-category" onclick="yesCancelAddNewCategory()">Yes</button>
                </div>

            </div>
        </div>

    </div>

    <div id="category-response-message-modal-id" class="category-response-message-modal-class">
        <!-- Modal content -->
        <div class="category-response-message-modal-content">
            <span class="category-response-message-modal-close">&times;</span>

            <span style="font-weight: bold;font-size: 18px;" id="category-success-message">Data Inserted Successfully</span>
        </div>
    </div>
</body>
</html>