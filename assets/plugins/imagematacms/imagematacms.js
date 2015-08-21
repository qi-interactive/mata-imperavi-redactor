if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
	RedactorPlugins.imagematacms = function()
	{
		return {
			init: function()
			{

				// if (!this.opts.imageManagerJson) return;
				var imageEditTemplate = String()
				+ '<section id="redactor-modal-image-edit">'
				+ '<div class="form-group">'
				+ '<label>' + this.lang.get('title') + '</label>'
				+ '<input type="text" id="redactor-image-title" class="form-control" />'
				+ '</div>'
				+ '<div class="form-group">'
				+ '<label class="redactor-image-link-option">' + this.lang.get('link') + '</label>'
				+ '<input type="text" id="redactor-image-link" class="redactor-image-link-option form-control" />'
				+ '</div>'
				+ '<label class="redactor-image-link-option checkbox-wrapper">'
				+ '<input type="checkbox" id="redactor-image-link-blank">'
				+ '<div></div>'
				+ '<span class="checkbox-label">'
				+ this.lang.get('link_new_tab')
				+'</span>'
				+ '</label>'
				+ '</section>';

				var imageDragDropTemplate = String()
				+ '<section id="redactor-modal-image-insert">'
				+ '<div id="redactor-modal-image-droparea">'
				+ '</div>'
				+ '</section>';

				this.image.loadEditableControls = this.imagematacms.loadEditableControls;
				this.opts.modal.imageEdit = imageEditTemplate;
				this.opts.modal.image = imageDragDropTemplate;
				this.progress = this.imagematacms.progressInit();
				this.upload.init = this.imagematacms.uploadInit;
				this.image.showEdit = this.imagematacms.showEdit;
				this.image.update = this.imagematacms.update;


				// this.modal.addCallback('image', this.imagematacms.show);
			},

			loadEditableControls: function($image)
			{
				var imageBox = $('<span id="redactor-image-box" data-redactor="verified">');
				imageBox.css('float', $image.css('float')).attr('contenteditable', false);

				if ($image[0].style.margin != 'auto')
				{
					imageBox.css({
						marginTop: $image[0].style.marginTop,
						marginBottom: $image[0].style.marginBottom,
						marginLeft: $image[0].style.marginLeft,
						marginRight: $image[0].style.marginRight
					});

					$image.css('margin', '');
				}
				else
				{
					imageBox.css({ 'display': 'block', 'margin': 'auto' });
				}

				$image.css('opacity', '.5').after(imageBox);


				if (this.opts.imageEditable)
				{
					// editter
					this.image.editter = $('<span class="hi-icon-effect-2" id="redactor-image-editter" data-redactor="verified"><span class="hi-icon hi-icon-cog"></span></span>');
					this.image.editter.attr('contenteditable', false);
					this.image.editter.on('click', $.proxy(function()
					{
						this.image.showEdit($image);
					}, this));

					imageBox.append(this.image.editter);

					// position correction
					var editerWidth = this.image.editter.innerWidth();
					this.image.editter.css('margin-left', '-' + editerWidth/2 + 'px');
				}

				return this.image.loadResizableControls($image, imageBox);

			},

			showEdit: function($image)
			{
				var $link = $image.closest('a');

				this.modal.load('imageEdit', this.lang.get('edit'), 705);

				this.image.buttonSave = this.modal.createActionButton(this.lang.get('save'));
				this.modal.createCancelButton();
				this.image.buttonDelete = this.modal.createDeleteButton(this.lang.get('_delete'));

				this.image.buttonDelete.on('click', $.proxy(function()
				{
					this.image.remove($image);

				}, this));

				this.image.buttonSave.on('click', $.proxy(function()
				{
					this.image.update($image);

				}, this));

				$('#redactor-image-title').val($image.attr('alt'));

				if (!this.opts.imageLink) $('.redactor-image-link-option').hide();
				else
				{
					var $redactorImageLink = $('#redactor-image-link');

					$redactorImageLink.attr('href', $image.attr('src'));
					if ($link.length !== 0)
					{
						$redactorImageLink.val($link.attr('href'));
						if ($link.attr('target') == '_blank') $('#redactor-image-link-blank').prop('checked', true);
					}
				}

				this.modal.show();

			},
			update: function($image)
			{
				this.image.hideResize();
				this.buffer.set();

				var $link = $image.closest('a');

				$image.attr('alt', $('#redactor-image-title').val());

				this.image.setFloating($image);

				// as link
				var link = $.trim($('#redactor-image-link').val());
				if (link !== '')
				{
					// test url (add protocol)
					var pattern = '((xn--)?[a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}';
					var re = new RegExp('^(http|ftp|https)://' + pattern, 'i');
					var re2 = new RegExp('^' + pattern, 'i');

					if (link.search(re) == -1 && link.search(re2) === 0 && this.opts.linkProtocol)
					{
						link = this.opts.linkProtocol + '://' + link;
					}

					var target = ($('#redactor-image-link-blank').prop('checked')) ? true : false;

					if ($link.length === 0)
					{
						var a = $('<a href="' + link + '">' + this.utils.getOuterHtml($image) + '</a>');
						if (target) a.attr('target', '_blank');

						$image.replaceWith(a);
					}
					else
					{
						$link.attr('href', link);
						if (target)
						{
							$link.attr('target', '_blank');
						}
						else
						{
							$link.removeAttr('target');
						}
					}
				}
				else if ($link.length !== 0)
				{
					$link.replaceWith(this.utils.getOuterHtml($image));

				}

				this.modal.close();
				this.observe.images();
				this.code.sync();


			},
			uploadInit: function(id, url, callback)
			{
				this.upload.direct = false;
				this.upload.callback = callback;
				this.upload.url = url;
				this.upload.$el = $(id);
				this.upload.$droparea = $('<div id="redactor-droparea" />');

				this.upload.$input = $('<input type="file" name="file" />');
				this.upload.$placeholdler = $('<div id="redactor-droparea-placeholder" />').append('<div class="add-media-inner-wrapper"><div class="hi-icon-effect-2"><div class="hi-icon hi-icon-cog"></div></div><span> CLICK or DRAG &amp; DROP <br> to upload a file</span></div>');

				this.upload.$placeholdler.append(this.upload.$input);
				this.upload.$droparea.append(this.upload.$placeholdler);
				this.upload.$el.append(this.upload.$droparea);

				this.upload.$droparea.off('redactor.upload');
				this.upload.$input.off('redactor.upload');

				this.upload.$droparea.on('dragover.redactor.upload', $.proxy(this.upload.onDrag, this));
				this.upload.$droparea.on('dragleave.redactor.upload', $.proxy(this.upload.onDragLeave, this));

				// change
				this.upload.$input.on('change.redactor.upload', $.proxy(function(e)
				{
					e = e.originalEvent || e;
					this.upload.traverseFile(this.upload.$input[0].files[0], e);
				}, this));

				// drop
				this.upload.$droparea.on('drop.redactor.upload', $.proxy(function(e)
				{
					e.preventDefault();

					this.upload.$droparea.removeClass('drag-hover').addClass('drag-drop');
					this.upload.onDrop(e);

				}, this));
			},
			progressInit: function()
			{
				return {
					show: function()
					{
						$('#redactor-modal-body').append($('<div id="redactor-progress"><span></span></div>'));
						$('#redactor-progress').fadeIn(function() {

							me = $(this);

							setTimeout(function() {
								me.children('span').css('background', '#78b572');
							}, 500);
						});


					},
					hide: function()
					{
						$('#redactor-progress').fadeOut(1500, function()
						{
							$(this).remove();
						});
					}

				};
			},

		};
	};
})(jQuery);
