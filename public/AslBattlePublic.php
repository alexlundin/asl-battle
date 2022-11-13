<?php

namespace AslBattles\FrontEnd;
/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://vk.com/aslundin
 * @since      1.0.0
 *
 * @package    Asl_Battle
 * @subpackage Asl_Battle/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Asl_Battle
 * @subpackage Asl_Battle/public
 * @author     Alex Lundin <aslundin@yandex.ru>
 */
class AslBattlePublic {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string $plugin_name The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string $version The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param string $plugin_name The name of the plugin.
	 * @param string $version The version of this plugin.
	 *
	 * @since    1.0.0
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;

	}

	public function asl_block_battle_render( $attr ) {
		$id = $attr['battleId'];

		return '<div class="asl-battle" id="asl-battle-' . $id . '" data-battle="' . $id . '"></div>';
	}

	public function register_block_battle() {
		wp_register_script(
			'asl-battle-block', plugin_dir_url( __FILE__ ) . '/block/build/js/asl-battle-block.js',
			array( 'wp-api-fetch', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n' )
		);
		register_block_type( 'asl/asl-battle', [
			'api_version'     => 2,
			'editor_script'   => 'asl-battle-block',
			'render_callback' => array( $this, 'asl_block_battle_render' )
		] );
	}


	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Asl_Battle_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Asl_Battle_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/asl-battle-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Asl_Battle_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Asl_Battle_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/asl-battle-public.js', array( 'jquery' ), $this->version, false );

	}

}
