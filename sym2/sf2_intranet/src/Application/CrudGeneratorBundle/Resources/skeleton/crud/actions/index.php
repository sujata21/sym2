
    /**
     * Lists all {{ entity }} entities.
     *
{% if 'annotation' == format %}
     * @Route("/", name="{{ route_name_prefix }}")
     * @Template()
{% endif %}
     */
    public function indexAction(Request $request = null)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity  = new {{ entity }}();
		$filterForm = $this->createForm(new {{ entity }}Type(), $entity);
        
        $qbl = $em->getRepository('{{ bundle }}:{{ entity }}')
		->createQueryBuilder('a');
		
		if(is_object($request) && $request->isMethod('POST')){
			$filterForm->bind($request);
			$obj = $filterForm->getData();
			if($obj->getName() != ""){
				$qbl->where("a.name like :name");
				$qbl->setParameter('name', $obj->getName().'%');
			}
		}
       
       $query = $qbl->getQuery();
			
		$paginator = $this->get('knp_paginator');
		$pagination = $paginator->paginate(
				$query,
				$this->get('request')->query->get('page', 1),
				10
		);
			
		$filter_form   = $filterForm->createView();
		$csrfToken = $this->container->get('form.csrf_provider')->generateCsrfToken('authenticate');
		
		{% if 'annotation' == format %}
			return compact('pagination', 'filter_form', 'csrfToken');
		{% else %}
        return $this->render('{{ bundle }}:{{ entity|replace({'\\': '/'}) }}:index.html.twig', compact('pagination', 'filter_form', 'csrfToken'));
		{% endif %}
    }

    
    	
			
		