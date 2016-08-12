'use strict';

/* jshint undef: true, unused: true */
/* globals m */

if (!window.components) {
	window.components = {};
}

if (!window.components.tabs) {

	window.components.tabs = {

		controller: function(tabs, opts){
			this.tab = m.prop(0);
			this.tabs = tabs;

			var self = this;
			this.click = function(ev){
				ev.preventDefault();
				var tab = parseInt(this.attributes['data-tab'].value);
				if (opts.tabset) {
					opts.tabset(ev, tab);
				} else if (!opts.stepbystep || (opts.stepbystep && !opts.tabenabled && self.tab() > tab) || (opts.stepbystep && opts.tabenabled && opts.tabenabled(tab))) {
					self.tab(tab);
					if (opts.ontab) { opts.ontab(self.tab()); }
				}
			};

			this.set = function(tab) {
				if (typeof tab === 'undefined') {
					tab = this.tab() < this.tabs.length - 1 ? this.tab() + 1 : this.tab();
				}
				this.tab(tab);
				if (opts.ontab) { opts.ontab(this.tab()); }
			};
		},
		
		view: function(ctrl){
			return m('div', [ 
				m('.comp-tabs-tabs', ctrl.tabs.map(function(tab, i){
					return m('.comp-tabs-tab', {
							onclick: ctrl.click, 
							class: i === ctrl.tab() ? 'active' : '',
							'data-tab': i
						}, 
						tab.tab ? tab.tab(i === ctrl.tab()) : (tab.component ? m.component(tab.component, tab.componentOpts, i === ctrl.tab()) : i)
					);
				})), 
				m('.comp-tabs-content', m.component(ctrl.tabs[ctrl.tab()])) 
			]);
		}
	};

}
