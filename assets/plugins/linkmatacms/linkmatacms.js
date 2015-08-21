if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
	RedactorPlugins.linkmatacms = function()
	{
		return {
			init: function()
			{
                var linkTemplate = String()
                + '<section id="redactor-modal-link-insert">'
                + '<div class="form-group">'
                + '<label>URL</label>'
                + '<input type="url" id="redactor-link-url" />'
                + '</div>'
                + '<div class="form-group">'
                + '<label>' + this.lang.get('text') + '</label>'
                + '<input type="text" id="redactor-link-url-text" />'
                + '</div>'
                + '<label class="checkbox-wrapper">'
                + '<input type="checkbox" id="redactor-link-blank">'
                + '<div></div>'
                + '<span class="checkbox-label">'
                + this.lang.get('link_new_tab')
                +'</span>'
                + '</label>'
                + '</section>';

                this.opts.modal.link = linkTemplate;
                this.link.show = this.linkmatacms.show;
                
			},
            show: function(e)
                {
                    if (typeof e != 'undefined' && e.preventDefault) e.preventDefault();

                    this.modal.load('link', this.lang.get('link_insert'), 600);

                    this.link.buttonInsert = this.modal.createActionButton(this.lang.get('insert'));
                    this.modal.createCancelButton();

                    this.selection.get();

                    this.link.getData();
                    this.link.cleanUrl();

                    if (this.link.target == '_blank') $('#redactor-link-blank').prop('checked', true);

                    this.link.$inputUrl = $('#redactor-link-url');
                    this.link.$inputText = $('#redactor-link-url-text');

                    this.link.$inputText.val(this.link.text);
                    this.link.$inputUrl.val(this.link.url);

                    this.link.buttonInsert.on('click', $.proxy(this.link.insert, this));

                    // hide link's tooltip
                    $('.redactor-link-tooltip').remove();

                    // show modal
                    this.selection.save();
                    this.modal.show();
                    this.link.$inputUrl.focus();
                }
		};
	};
})(jQuery);
