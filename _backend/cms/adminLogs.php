<?php
    /**
    * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
    *                   Criado por Gabriel Azuaga Barbosa
    *                  E-mail: gabrielbarbosaweb7@gmail.com
    *  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
    * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
    */

    /* Load Framework PHP created by Gabriel A. Barbosa */
    require "EnginePHP7/enginephp7.init.php";
?>

<!doctype html>
<html lang="en-us">
<head>
    <!-- Head -->
    <?php
      $pageTitle = "Logs do Sistema";
      include "pages/includes/head.php";
    ?>
</head>
<body>

<!-- App -->
<div id="app" class="reactive-app no-saved-theme header-bg-danger sidebar-type-push sidebar-state-open sidebar-tr-state-open sidebar-bg-default sidebar-option-default">

    <!-- inject-body-start:js -->
    <script src="<?php echo RAIZ_DIR; ?>assets/js/settings.js"></script>
    <!-- endinject -->

    <!--Begin Header-->
    <header id="header" class="header-wrap clearfix">

      <!-- Header-Tools -->
      <?php
        $headerTitle = "Menu Editor";
        include "pages/includes/header-tools.php";
      ?>



    </header>
    <!--End Header-->

    <!--Begin Loader-->
    <div class="page-loader loader-wrap" id="loader-wrap">
        <div class="loader loading-icon"></div>
    </div>
    <!--End Loader-->

    <!--Begin Content-->
    <section id="main" class="main-wrap bgc-white-darkest" role="main">
        <div class="container-fluid content-wrap">
            <div class="row panel-grid grid-stack" id="panel-grid">

              <section class="panel-wrap panel-grid-item col-xl-12">
                  <!--Start Panel-->
                  <div class="panel bgc-white-dark">
                      <div class="panel-header bgc-white-dark panel-header-md">
                          <ul class="nav nav-tabs nav-semi-border" role="tablist">
                              <li class="nav-item">
                                  <a class="nav-link px-4 panel-header-link active" data-toggle="tab" href="#users" role="tab">Users</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link px-4 panel-header-link" data-toggle="tab" href="#roles" role="tab">Roles</a>
                              </li>
                          </ul>
                          <!--Start panel icons-->
                          <div class="panel-icons panel-icon-slide ">
                              <ul>
                                  <li>
                                      <a href="">
                                          <i class="fa fa-angle-left"></i>
                                      </a>
                                      <ul>
                                          <li>
                                              <a class="panel-refresh-btn" href="">
                                                  <i class="fa fa-refresh"></i>
                                              </a>
                                          </li>
                                          <li>
                                              <a class="panel-pin-btn" href="">
                                                  <i data-icon="icon-login icon-logout" class="icon-logout"></i>
                                              </a>
                                          </li>
                                          <li>
                                              <a class="panel-full-btn" href="">
                                                  <i data-icon="icon-size-actual icon-size-fullscreen" class="fs-7 icon-size-fullscreen fw-bold"></i>
                                              </a>
                                          </li>
                                          <li>
                                              <a class="panel-maximize-btn" href="">
                                                  <i data-icon="ion-android-contract ion-android-expand" class="fs-5 ion-android-expand fw-bold"></i>
                                              </a>
                                          </li>
                                          <li>
                                              <a class="panel-collapse-btn" href="">
                                                  <i data-icon="ion-android-add ion-android-remove" class="fs-4 ion-android-remove"></i>
                                              </a>
                                          </li>
                                          <li>
                                              <a class="panel-close-btn" href="">
                                                  <i class="fs-4 ion-android-close"></i>
                                              </a>
                                          </li>
                                      </ul>
                                  </li>
                              </ul>
                          </div>
                          <!--End panel icons-->
                      </div>
                      <div class="panel-body panel-body-p pt-5">
                          <!-- Tab panes -->
                          <div class="tab-content">
                              <div class="tab-pane active" id="users" role="tabpanel">
                                  <div class="page-size-table">
                                      <div id="user-toolbar">
                                          <button id="new-table-row" class="btn btn-default">
                                              <i class="fa icon-user-follow icon-mr-ch"></i>New</button>
                                          <button id="remove-table-row" class="btn btn-default" disabled>
                                              <i class="fa icon-trash icon-mr-ch"></i>Delete</button>
                                      </div>
                                      <div class="modal" id="bt-table-modal">
                                          <div class="modal-dialog modal-lg" role="document">
                                              <div class="modal-content">
                                                  <div class="modal-header">
                                                      <h5 class="modal-title">Modal title</h5>
                                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                          <span aria-hidden="true">&times;</span>
                                                      </button>
                                                  </div>
                                                  <div class="modal-body">
                                                      <div class="row mb-3">
                                                          <div class="col-4 text-right">
                                                              <b>Image:</b>
                                                          </div>
                                                          <div class="col-8">
                                                              <div class="imageupload ">
                                                                  <ul class="nav nav-tabs" role="tablist">
                                                                      <li class="nav-item">
                                                                          <a class="nav-link active" data-toggle="tab" href="#img-uploade-file" role="tab">Upload File</a>
                                                                      </li>
                                                                      <li class="nav-item">
                                                                          <a class="nav-link" data-toggle="tab" href="#img-uploade-url" role="tab">Set URL</a>
                                                                      </li>
                                                                  </ul>
                                                                  <!-- Tab panes -->
                                                                  <div class="tab-content p-3 bw-1 bc-gray-lighter">
                                                                      <div class="tab-pane active file-tab" id="img-uploade-file" role="tabpanel">
                                                                          <div>
                                                                              <label class="btn btn-default btn-file">
                                                                                  <span>Browse</span>
                                                                                  <!-- The file is stored here. -->
                                                                                  <input type="file" name="bt-modal-input-image-file"> </label>
                                                                              <button type="button" class="btn btn-default">Remove</button>
                                                                          </div>
                                                                      </div>
                                                                      <div class="tab-pane url-tab" id="img-uploade-url" role="tabpanel">
                                                                          <div class="input-group">
                                                                              <input type="text" class="form-control" placeholder="Image URL">
                                                                              <div class="input-group-btn">
                                                                                  <button type="button" class="btn btn-default">Submit</button>
                                                                              </div>
                                                                              <!-- The URL is stored here. -->
                                                                              <input type="hidden" name="bt-modal-input-image-url"> </div>
                                                                          <div>
                                                                              <button type="button" class="btn btn-default">Remove</button>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div class="modal-footer">
                                                      <label class="custom-control custom-checkbox pl-5 mr-4">
                                                          <input type="checkbox" class="custom-control-input">
                                                          <span class="custom-control-indicator"></span>
                                                          <span class="custom-control-description">Leave Open</span>
                                                      </label>
                                                      <button type="button" class="btn btn-primary add-data">Add</button>
                                                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <table id="table-users" class="card-view-no-edit page-size-table"></table>
                                  </div>
                              </div>
                              <div class="tab-pane" id="roles" role="tabpanel">
                                  <div class="page-size-table">
                                      <div id="role-toolbar"></div>
                                      <table id="table-roles" class="card-view-no-edit page-size-table"></table>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!--End Panel-->
              </section>
            </div>
        </div>
    </section>
    <!--End Content-->

      <!--Begin Sidebar-->
      <?php
        $setMenu = "adminLogs";
        include "pages/includes/sidebar.php";
      ?>
      <!--End Sidebar-->

      <!-- Footer -->
      <?php include "pages/includes/footer.php"; ?>
      <!-- Footer -->

</body>
</html>
