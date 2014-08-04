<?php

namespace AW\DynamicTextBundle\Form;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ImageType extends AbstractType {
	public function buildForm(FormBuilderInterface $builder, array $options) {
		$builder
				->add('text', 'text',
						array('label' => 'Your text:', 'required' => false,
								'attr' => array('placeholder' => 'Your text')))
				->add('font', 'choice',
						array(
								'choices' => array('arial.ttf' => 'Arial',
										'COOPBL.TTF' => 'CoopBL',
										'BOYCOTT.ttf' => 'BOYCOTT'),
								'label' => 'Fonts', 'required' => false,
								'expanded' => false, 'multiple' => false))
				->add('fontSize', 'integer',
						array('label' => 'Font size:', 'required' => false,
								'attr' => array('placeholder' => 'Font size')))
				->add('fontColor', 'text',
						array('label' => 'Font color:', 'required' => false,
								'attr' => array('placeholder' => 'Font color')))
				->add('textX', 'integer',
						array('label' => 'Text horizontal position:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text horizontal position')))
				->add('textY', 'integer',
						array('label' => 'Text vertical position:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text vertical position')))
				->add('textPosition', 'choice',
						array(
								'choices' => array('TL' => 'TL', //TopLeft
										'TM' => 'TM', //TopMiddle
										'TR' => 'TR', //TopRight
										'ML' => 'ML', //MiddleLeft
										'MM' => 'MM', //MiddleMiddle - Center
										'MR' => 'MR', //MiddleRight
										'BL' => 'BL', //BottomLeft
										'BM' => 'BM', //BottomMiddle
										'BR' => 'BR'),
								//BottomRoght
								'label' => 'Text gravity position:',
								'required' => false, 'expanded' => true,
								'multiple' => false))
				->add('textWaterMark', 'checkbox',
						array('label' => 'Text watermark:', 'required' => false))
				->add('textWaterMarkBrightness', 'integer',
						array('label' => 'Text watermark brightness:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text watermark brightness')))
				->add('textWaterMarkSaturation', 'integer',
						array('label' => 'Text watermark saturation:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text watermark saturation')))
				->add('textPerspective', 'checkbox',
						array('label' => 'Text perspective:',
								'required' => false))
				->add('textPerspectiveLeftCorner', 'integer',
						array('label' => 'Left upper corner:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Left upper corner')))
				->add('textPespectiveRightCorner', 'integer',
						array('label' => 'Light upper corner:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Right upper corner')))
				->add('textCircle', 'checkbox',
						array('label' => 'Text circle:', 'required' => false))
				->add('textCircleArcRotateAngles', 'text',
						array('label' => 'Text circle arc & rotate angles:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text circle arc & rotate angles')))
				->add('textRotate', 'integer',
						array('label' => 'Text rotate:', 'required' => false))
				->add('textWave', 'checkbox',
						array('label' => 'Text wave:', 'required' => false))
				->add('textWaveHeight', 'integer',
						array('label' => 'Text horizontal position:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text wave height')))
				->add('textWaveLength', 'integer',
						array('label' => 'Text horizontal position:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text wave length')))
				//Image #2 form
				->add('text1', 'text',
						array('label' => 'Your text:', 'required' => false,
								'attr' => array('placeholder' => 'Your text')))
				->add('font1', 'choice',
						array(
								'choices' => array('arial.ttf' => 'Arial',
										'COOPBL.TTF' => 'CoopBL'),
								'label' => 'Fonts', 'required' => false,
								'expanded' => false, 'multiple' => false))
				->add('fontSize1', 'integer',
						array('label' => 'Font size:', 'required' => false,
								'attr' => array('placeholder' => 'Font size')))
				->add('fontColor1', 'text',
						array('label' => 'Font color:', 'required' => false,
								'attr' => array('placeholder' => 'Font color')))
				->add('textX1', 'integer',
						array('label' => 'Text horizontal position:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text horizontal position')))
				->add('textY1', 'integer',
						array('label' => 'Text vertical position:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text vertical position')))
				->add('textPosition1', 'choice',
						array(
								'choices' => array('TL' => 'TL', //TopLeft
										'TM' => 'TM', //TopMiddle
										'TR' => 'TR', //TopRight
										'ML' => 'ML', //MiddleLeft
										'MM' => 'MM', //MiddleMiddle - Center
										'MR' => 'MR', //MiddleRight
										'BL' => 'BL', //BottomLeft
										'BM' => 'BM', //BottomMiddle
										'BR' => 'BR'),
								//BottomRoght
								'label' => 'Text gravity position:',
								'required' => false, 'expanded' => true,
								'multiple' => false))
				->add('textWaterMark1', 'checkbox',
						array('label' => 'Text watermark:', 'required' => false))
				->add('textWaterMarkBrightness1', 'integer',
						array('label' => 'Text watermark brightness:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text watermark brightness')))
				->add('textWaterMarkSaturation1', 'integer',
						array('label' => 'Text watermark saturation:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text watermark saturation')))
				->add('textPerspective1', 'checkbox',
						array('label' => 'Text perspective:',
								'required' => false))
				->add('textPerspectiveLeftCorner1', 'integer',
						array('label' => 'Left upper corner:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Left upper corner')))
				->add('textPespectiveRightCorner1', 'integer',
						array('label' => 'Light upper corner:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Right upper corner')))
				->add('textCircle1', 'checkbox',
						array('label' => 'Text circle:', 'required' => false))
				->add('textCircleArcRotateAngles1', 'text',
						array('label' => 'Text circle arc & rotate angles:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text circle arc & rotate angles')))
				->add('textRotate1', 'integer',
						array('label' => 'Text rotate:', 'required' => false))
				->add('textWave1', 'checkbox',
						array('label' => 'Text wave:', 'required' => false))
				->add('textWaveHeight1', 'integer',
						array('label' => 'Text horizontal position:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text wave height')))
				->add('textWaveLength1', 'integer',
						array('label' => 'Text horizontal position:',
								'required' => false,
								'attr' => array(
										'placeholder' => 'Text wave length')));
	}

	public function setDefaultOptions(OptionsResolverInterface $resolver) {
		$resolver
				->setDefaults(
						array(
								'data_class' => 'AW\DynamicTextBundle\Entity\Image',
								'csrf_protection' => false,));
	}

	public function getName() {
		return 'aw_dynamictextbundle_imagetype';
	}
}
